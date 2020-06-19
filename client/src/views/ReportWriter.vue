<template>
	<div class="page">
		<div class="report">
			<TitleWriter v-model="report.title" :editing="editing" v-on:add-under="add_under_title"/>
			<div :key="element.id" v-for="element in report.elements">
				<div v-if="element.type === 'header'">
					<HeaderWriter :articleElement="element" :editing="editing" v-on:add-under="add_under" v-on:remove="remove"/>
				</div>
				<div v-else-if="element.type === 'paragraph'">
					<ParagraphWriter :articleElement="element" :editing="editing" v-on:add-under="add_under" v-on:remove="remove"/>
				</div>
				<div v-else-if="element.type === 'image'">
					<ImageWriter :articleElement="element" :editing="editing" v-on:add-under="add_under" v-on:remove="remove"/>
				</div>
			</div>
		</div>
		
		<div class="right-info">
			<div class="tools">
				<div class="tool" @click="add_under('header')">
					<img height="15px" style="margin-right: 10px" src="../assets/icons/header.svg">
					Add header
				</div>
				<div class="tool" @click="add_under('paragraph')">
					<img height="15px" style="margin-right: 10px" src="../assets/icons/paragraph.svg">
					Add paragraph
				</div>
				<div class="tool" @click="imageDialog()">
					<img height="20px" style="margin-right: 8px" src="../assets/icons/add_image.svg">
					<span>
						Add image
					</span>
				</div>

				<input style="display: none" type="file" id="imageUpload" ref="imageFile" v-on:change="add_under('image')"/>
				
				<div id="tools-buttons">
					<template v-if="editing">
						<button @click="edit(false)" class="tool-button" style="background-color: var(--lightblue); color: white">Show</button>
					</template>
					<template v-else>
						<button @click="edit(true)" class="tool-button" >Edit</button>
					</template>
					<button @click="save()" class="tool-button" style="background-color: var(--primary); color: white">Save</button>
				</div>
			</div>
			<div id="report-info">
				<h4>Author:</h4>
				<input id="author-input" v-model="report.author" type="text">
				<h4>Description:</h4>
				<textarea id="description-input" v-model="report.description" type="text"></textarea>
				<h4>Thumbnail:</h4>
				<input type="file" ref="thumbnailInput" v-on:change="add_thumbnail()"/>
				<img style="margin-top: 15px" width="100%" :src="report.thumbnail" v-if="report.thumbnail"/>
			</div>
			<button v-if="id" @click="delete_article()" id="delete-button" style="background-color: var(--red); color: white">Delete</button>
		</div>
  </div>
</template>

<script>
import HeaderWriter from '../components/writers/HeaderWriter.vue';
import TitleWriter from '../components/writers/TitleWriter.vue';
import ParagraphWriter from '../components/writers/ParagraphWriter.vue';
import ImageWriter from '../components/writers/ImageWriter.vue';

import Utils from '../utils/utils';

import router from '../router/index';
import axios from 'axios';
import config from '../../vue.config';

export default {
	name: 'ReportWriter',
	components: {
		TitleWriter,
		HeaderWriter,
		ParagraphWriter,
		ImageWriter,
	},
	props: ['id'],
	data(){
		return {
			editing: false,
			imageIndex: -1,
			report:{
				_id: '',
				title: 'Title',
				author: '',
				description: '',
				thumbnail: '',//http://localhost:5000/static/images/leaf.jpg
				elements: [],
			},
		}
	},
	created(){
		if(this.id){
			axios.get( config.api.news + '?id=' + this.id)
      .then(function(res){
        this.report = res.data;
      }.bind(this))
      .catch(function(err){
        alert('Error loading news ' + err.message);
      });
		}
	},
	methods: {
    edit(value) {
      this.editing = value;
    },
		save(){
			let formData = new FormData();
			axios.post(config.api.news, formData,
					{
						data: { report: this.report }
					}
				).then(function(){
					router.push({name: 'News'})//navigate to report page
        })
        .catch(function(){
					alert('Error uploading report');
        });
		},
		delete_article(){
			axios.delete(config.api.news + '/' + this.id
				).then(function(){
					router.push({name: 'News'})//navigate to news page
        })
        .catch(function(){
					alert('Error deleting report');
        });
		},
		add_under_title(type){
			let newElement = this.generate_element(type);
			this.report.elements.splice(0, 0, newElement);
		},
		add_under(type, id){//generate 'type' object after object with 'id'
			if(id && type == 'image' && this.imageIndex == -1){//image under some element with no file chosen
				this.imageIndex = Utils.findById(this.report.elements, id) + 1;
				this.imageDialog();
			}
			else if(!id && type == 'image' && this.imageIndex != -1){//image under some element with file chosen
				let newElement = this.generate_element(type);
				this.report.elements.splice(this.imageIndex, 0, newElement);
				this.imageIndex = -1;
			}
			else if(!id){//called from toolset
				let newElement = this.generate_element(type);
				this.report.elements.push(newElement);
			}
			else{//element under another element
				let newElement = this.generate_element(type);
				let index = Utils.findById(this.report.elements, id) + 1;
				if(index === -1){
					index = this.report.elements.length;//better to put it at the end than giving error
				}
				this.report.elements.splice(index, 0, newElement);
			}
		},
		remove(id){
			let index = Utils.findById(this.report.elements, id);
			this.report.elements.splice(index, 1);
		},
		imageDialog(){
			document.querySelector("#imageUpload").click();
		},
		generate_element(type){
			var rand = Math.floor(Math.random() * 1000);
			var newElement = {
					id: rand,
					content: 'Header',
					type: '',
			};
			if(type === 'header'){
				newElement.type = type;
				newElement.content = 'Some header';
			}else if(type === 'paragraph'){
				newElement.type = type;
				newElement.content = 'Paragraph here...';
			}else if(type === 'image'){
        let uploadFile = this.$refs.imageFile.files[0];
				let formData = new FormData();
				formData.append('reportImage', uploadFile);
				axios.post( config.api.storage + '/uploadImage', formData,
					{
						headers: {'Content-Type': 'multipart/form-data'}
					}
				).then(function(res){
					newElement.type = type;
					newElement.content = config.devServer.proxy + res.data;
        })
        .catch(function(){
					alert('Error uploading image');
        });
			}
			return newElement;
		},
		add_thumbnail(){
			let uploadFile = this.$refs.thumbnailInput.files[0];
			let formData = new FormData();
			formData.append('reportImage', uploadFile);
			axios.post( config.api.storage + '/uploadImage', formData,
				{
					headers: {'Content-Type': 'multipart/form-data'}
				}
			).then(function(res){
				this.report.thumbnail = config.devServer.proxy + res.data;
			}.bind(this))
			.catch(function(){
				alert('Error uploading image');
			});
		}
  },
}
</script>

<style scoped>
  .page{
		display: flex;
		padding: 40px 80px;
  }
	.report{
		display: flex;
		flex-direction: column;
		flex: 1;
		padding-top: 20px;
		margin-right: 50px;
		min-height: 400px;
		border: 1px solid rgba(0, 0, 0, 0.125);
		-webkit-box-shadow: 0px 8px 4px 0px rgba(171,171,171,1);
		-moz-box-shadow: 0px 8px 4px 0px rgba(171,171,171,1);
		box-shadow: 0px 8px 4px 0px rgba(171,171,171,1);
	}
	.right-info{
		width: 200px;
	}
	.tools{
		display: table;
		width: calc(100% - 2px);
		border: 1px solid rgba(0, 0, 0, 0.125);
		-webkit-box-shadow: 0px 8px 4px 0px rgba(171,171,171,1);
		-moz-box-shadow: 0px 8px 4px 0px rgba(171,171,171,1);
		box-shadow: 0px 8px 4px 0px rgba(171,171,171,1);
	}
	.tool{
		display: flex;
		align-items: center;
		padding: 10px;
		border: 0px solid rgba(0, 0, 0, 0.125);
		border-bottom-width: 1px;
	}
	.tool:hover{
		background-color: rgba(0, 0, 0, 0.125);
		cursor: pointer;
	}
	.tool.selected{
		background-color: rgba(0, 0, 0, 0.125);
	}
	#tools-buttons{
		display: flex;
		justify-content: space-between;
		margin-bottom: -1px;
	}
	.tool-button{
		border: 0;
		width: 50%;
		height: 30px;
		font-size: 16px;
	}
	#report-info{
		margin-top: 30px;
	}
	#author-input{
		width: calc(100% - 8px);/*2px padding 2px border*/
		font-size: 15px;
		color: var(--darkgray);
	}
	#description-input{
		width: calc(100% - 14px);/*2px padding 2px border*/
    height: 100px;
    padding: 6px;
    font-size: 14px;
    color: var(--darkgray);
    resize: vertical;
	}
	#delete-button{
		border: 0;
		width: 100%;
		height: 30px;
		font-size: 16px;
		margin-top: 20px;
		cursor: pointer;
	}
</style>
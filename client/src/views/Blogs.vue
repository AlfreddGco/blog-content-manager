<template>
  <div class="page">
    <div id="blog-header">
      <h2>Blogs</h2>
      <router-link to="/write_blog">
        <div class="btn">
          New blog
        </div>
      </router-link>
    </div>
    <div class="blogs">
      <Card :key="blog.id" v-for="blog in blogs" :article="blog" route="BlogEditor"/>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue';

import axios from 'axios';
import config from '../../config';

export default {
  name: 'Blogs',
  components: {
    Card
  },
  data(){
    return {
      blogs: [],
    }
  },
  created() {
    axios.get(config.api.blogs)
      .then(function(res){
        this.blogs = this.blogs.concat(res.data);
      }.bind(this))
      .catch(function(err){
        alert('Error loading blogs ' + err.message);
      });
  }
}
</script>

<style scoped>
  .blogs{
    display: flex;
    flex-flow: wrap;
    margin: 0 50px;
  }
  .page{
    padding-top: 40px;
  }

  #blog-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 50px;
    padding: 0 20px;
    border: 0px solid rgba(0, 0, 0, 0.125);
    border-bottom-width: 1px;
  }
</style>

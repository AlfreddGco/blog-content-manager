<template>
  <div class="page">
    <div id="blog-header">
      <h2>News</h2>
      <router-link to="/write_report">
        <div class="btn">
          Add new
        </div>
      </router-link>
    </div>
    <div class="news">
      <Card :key="report.id" v-for="report in news" :article="report" route="ReportEditor"/>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue';

import axios from 'axios';
import config from '../../vue.config';

export default {
  name: 'News',
  components: {
    Card
  },
  data(){
    return {
      news: [],
    }
  },
  created() {
    axios.get(config.api.news)
      .then(function(res){
        this.news = this.news.concat(res.data);
      }.bind(this))
      .catch(function(err){
        alert('Error loading news ' + err.message);
      });
  }
}
</script>

<style scoped>
  .news{
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
<template>
  <div class="card-container">
    <div class="article">
      <router-link :to="{ name: route, params: {id: article._id } }">
        <img width="100%" :src="article.thumbnail">
        <div class="article-description">
          <h4 class="title">{{article.title}}</h4>
          <p class="description">{{article.description}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['article', 'route'],
}
</script>

<style scoped>
  .card-container{
    display: flex;
    justify-content: center;
    width: 25%;
  }
  .article{
    width: 88%;
    border: 1px solid var(--translucid);
    padding-bottom: 20px;
    margin-top: 40px;
  }
  .title{
    margin: 10px 0;
  }
  .description{
    margin: 0 20px;
    font-size: 14px;
    text-align: justify;
  }
</style>
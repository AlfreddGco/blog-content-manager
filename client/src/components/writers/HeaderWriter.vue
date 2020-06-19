<template>
  <div class="container edit-container" v-if="editing">
    <input v-model="articleElement.content" type="text" placeholder="Header">
    <MiniTools v-on:add-under="$emit('add-under', $event, articleElement.id)" v-on:remove="$emit('remove', articleElement.id)"/>
  </div>
  <div class="container" v-else>
    <h3>{{articleElement.content}}</h3>
  </div>
</template>

<script>
  import MiniTools from './MiniTools.vue';
  export default {
    name: 'HeaderWriter',
    components: {
      MiniTools,
    },
    props: ['articleElement', 'editing'],
  }
</script>

<style scoped>
  .container{
    border: 0 solid var(--translucid);
    margin-bottom: 40px;
  }
  .edit-container{
    padding-bottom: 30px;
    border-bottom-width: 1px;
    position: relative;
  }
  input{
    width: 90%;
    height: 40px;
    padding: 6px 20px;
    font-size: 18px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    color: var(--darkgray);
  }
  input:focus{
    outline: 0;
  }
</style>
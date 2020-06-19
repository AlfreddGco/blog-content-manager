<template>
  <div class="container edit-container" v-if="editing">
    <textarea v-model="articleElement.content" type="text" placeholder="Paragraph">
    </textarea>
    <MiniTools v-on:add-under="$emit('add-under', $event, articleElement.id)" v-on:remove="$emit('remove', articleElement.id)"/>
  </div>
  <div class="container" v-else>
    <p>{{articleElement.content}}</p>
  </div>
</template>

<script>
  import MiniTools from './MiniTools.vue';
  export default {
    name: 'ParagraphWriter',
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
  textarea{
    width: 90%;
    height: 200px;
    padding: 6px 20px;
    font-size: 16px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    color: var(--darkgray);
    resize: vertical;
  }
  p{
    margin: auto;
    width: 90%;
    text-align: justify;
    font-size: 16px;
  }
</style>
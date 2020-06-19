<template>
  <div class="container edit-container" v-if="editing">
    <img :src="articleElement.content">
    <MiniTools v-on:add-under="$emit('add-under', $event)"
    v-on:remove="$emit('remove', articleElement.id)"
    />
  </div>
  <div class="container" v-else>
    <img :src="articleElement.content">
  </div>
</template>

<script>
  import MiniTools from './MiniTools.vue';
  export default {
    name: 'ImageWriter',
    components: {
      MiniTools,
    },
    props: {
      articleElement: {
        type: Object,
        required: true,
      },
      editing: {
        type: Boolean,
        required: true,
      }
    }
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
  img{
    max-width: 90%;
  }
</style>
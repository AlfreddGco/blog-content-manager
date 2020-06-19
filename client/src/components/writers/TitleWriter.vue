<template>
  <div class="container edit-container" v-if="editing">
    <input :value="value" @input="handleInput()" ref="title" type="text" placeholder="Header">
    <MiniTools v-on:add-under="$emit('add-under', $event)"
    v-on:remove="$emit('remove')"
    :removable="false"
    />
  </div>
  <div class="container" v-else>
    <h2>{{value}}</h2>
  </div>
</template>

<script>
  import MiniTools from './MiniTools.vue';
  export default {
    name: 'TitleWriter',
    components: {
      MiniTools,
    },
    props: ['value', 'editing'],
    methods: {
      handleInput(){
        this.$emit('input', this.$refs.title.value);
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
  input{
    width: 90%;
    height: 40px;
    padding: 6px 20px;
    font-size: 24px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    color: var(--darkgray);
  }
  input:focus{
    outline: 0;
  }
</style>
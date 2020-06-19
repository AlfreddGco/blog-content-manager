<template>
  <div class="minitools" :class="{removable: removable}">
    <template v-if="removable">
    <img @click="$emit('remove')" height="16px" src="../../assets/icons/delete.svg">
    </template>
    <img @click="$emit('add-under', 'header')" height="15px" src="../../assets/icons/header.svg">
    <img @click="$emit('add-under', 'paragraph')" height="15px" src="../../assets/icons/paragraph.svg">
    <img @click="$emit('add-under', 'image')" height="18px" style="margin-top: 2px" src="../../assets/icons/add_image.svg">
  </div>
</template>

<script>
export default {
  name: 'MiniTools',
  props: {
    removable: {
      type: Boolean,
      default: true
    },
    computed: {
      horizontalPosition: function () {
        if(this.removable){
          return "calc(50% - (126px / 2))";
        }else{
          return "calc(50% - (100px / 2))";
        }
      }
    }
  },
}
</script>

<style scoped>
  .minitools{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: -15px;
    right: calc(50% - (100px / 2));
    margin: 0 auto;
    padding: 5px 15px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.125);
		-webkit-box-shadow: 0px 3px 4px 0px rgba(171,171,171,1);
		-moz-box-shadow: 0px 3px 4px 0px rgba(171,171,171,1);
		box-shadow: 0px 3px 4px 0px rgba(171,171,171,1);
  }
  .minitools.removable{
    right: calc(50% - (126px / 2));
  }
  .minitools > img{
    cursor: pointer;
  }
  .minitools > img:not(:last-child){
    margin-right: 10px;
  }
</style>
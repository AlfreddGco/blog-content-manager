<template>
  <div class="home">
    <div id="blog-header">
      <h2>Home</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
  .home{
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
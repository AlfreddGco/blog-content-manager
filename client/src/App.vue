<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  export default{
    name: 'app',
    components: {
      Header
    },
  }
</script>

<style>
:root{
  --green: #6aac24;
  --red: #ff2e2e;
  --gray: #5b5b5b;
  --darkgray: #3d3d3d;
  --lightblue: #4d7cff;
  --translucid: rgba(0, 0, 0, 0.125);
  --primary: var(--green);
  --secondary: var(--gray);
}
html,body{
  /*overflow-x: hidden;*/
  margin: 0;
}
a{
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
button:focus, textarea:focus{
  outline: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.btn{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
  border: 0;
  border-radius: 5px;
  padding: 10px 20px;
  color: white;
  height: 20px;
}
</style>

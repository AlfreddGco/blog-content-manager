<template>
  <div id="nav">
    <img alt="Vue logo" height="50px" style="margin-right: 20px" src="../assets/logo.png">
    <router-link to="/">Content Manager</router-link>
    <router-link to="/blogs">Blogs</router-link>
    <router-link to="/news">News</router-link>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
#nav {
  display: flex;
  align-items: center;
  padding: 20px 50px;
  background-color: #000;
  background-color: var(--primary);
}

#nav a {
  font-weight: bold;
  color: white;
  margin-right: 20px;
}

#nav a.router-link-exact-active {
  color: var(--secondary);
}
</style>

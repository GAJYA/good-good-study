<template>
  <div id="app">
    <router-link to="/">index</router-link> |
    <router-link to="/about">about</router-link> |
    <router-link to="/detail/123">detail</router-link> 
    <!-- <router-link to="/footer">footer</router-link>  -->

    <router-view></router-view>
    
  </div>
</template>

<script>

export default {
  name: 'App',
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <hr>
    <router-link to="/">index</router-link> |
    <router-link to="/about">about</router-link> |
    <router-link to="/footer">footer</router-link> 

    <router-view></router-view>
    
    <hr>
    <div>here is the end of the web</div> 
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
</style>

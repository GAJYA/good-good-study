<template>
  <div>
      <h1>{{ title }}</h1>
      <ul v-for="item in posts" :key="item.id">
          <li>{{ item.title }}</li>
      </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Home',
    // Nuxt中特殊提供的一个钩子函数，专门用于获取页面服务端渲染的数据
    async asyncData () {
        const { data } = await axios({
            method: 'GET',
            url: 'http://localhost:3000/data.json'
        })
        // 返回一个对象 
        return data
    }
}
</script>

<style>

</style>
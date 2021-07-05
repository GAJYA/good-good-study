<template>
  <div id="app">
      <ul>
          <li>
              <router-link to="/">Home</router-link>
          </li>
          <li>
              <router-link to="/about">About</router-link>
          </li>
          <li>
              <router-link to="/posts">Posts</router-link>
          </li>
      </ul>

      <!-- 路由出口 -->
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
        message: '你好吖', // 中文可能展示乱码，需要设置编码格式
    }
  },
  methods: {
    onclick() {
      console.log('click button')
    },
  },
}
</script>

<style></style>

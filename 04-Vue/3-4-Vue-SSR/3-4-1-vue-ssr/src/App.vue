<template>
  <div id="app">
      <h1>客户端交互</h1>
    <h1>{{ message }}</h1>
    <input type="text" v-model="message">
    <hr>
    <button @click="onclick">点击按钮</button>
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

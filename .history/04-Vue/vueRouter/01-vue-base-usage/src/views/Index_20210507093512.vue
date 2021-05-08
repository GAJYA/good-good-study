<template>
  <div>
      这是 Index 页面
      <!-- <a @click="push">detail</a> -->
  </div>
</template>

<script>
export default {
    name: 'Index',
    methods: {
        replace() {
            // this.$router.replace('/detail/1234')
        },
        push() {
            // this.$router.push('/detail/1234')
        },
    }
}
</script>

<style>

</style>
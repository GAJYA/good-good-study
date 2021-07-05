<template>
  <div>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Posts',
  metaInfo: {
    title: 'Posts'
  },
  data() {
    return {
      //   posts: []
    }
  },
  computed: {
    ...mapState(['posts'])
  },
  //
  serverPrefetch() {
    // 调用action，返回promise
    // this.$store.dispatch('getPosts')
    return this.getPosts()
  },
  async created() {
    // const { data } = await axios({
    //     method: 'GET',
    //     url:''
    // })
    // this.posts = data.data
  },
  methods: {
    ...mapActions(['getPosts'])
  }
}
</script>

<style></style>

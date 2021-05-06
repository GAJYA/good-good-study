<template>
    <div>
        <p>通过路由规则获取：{{$route.params.id}}</p>
        <p>通过开启props获取：{{id}}</p>
        <button @click="push()">push</button>
    </div>
</template>

<script>
export default {
    name: 'Detail',
    props: ['id'],
    methods: {
        push () {
            this.$router.push('/')
            this.$router.push({name: 'Index'})
        }
    }
}
</script>

<style>

</style>
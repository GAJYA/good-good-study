<template>
    <div>
        <p>通过路由规则获取：{{$route.params.id}}</p>
        <p>通过开启props：{{id}}</p>
    </div>
</template>

<script>
export default {
    name: 'Detail',
    props: ['id']
}
</script>

<style>

</style>
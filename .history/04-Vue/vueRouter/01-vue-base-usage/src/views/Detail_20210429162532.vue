<template>
    <div>
        <p></p>方式一：{{$route.params.id}}
        <p>方式二：{{id}}</p>
        
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
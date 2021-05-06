<template>
    <div>
        方式一：{{$route.params.id}}
        <p></p>
        方式二：
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
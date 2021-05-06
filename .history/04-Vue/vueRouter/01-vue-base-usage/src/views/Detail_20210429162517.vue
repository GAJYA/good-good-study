<template>
    <div>
        方式一：{{$route.params.id}}
        <p></p>
        
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
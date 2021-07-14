<template>
  <form>
      <slot></slot>
  </form>
</template>

<script>
export default {
    name: 'Form',
    provide() {
        return {
            form: this
        }
    },
    props: {
        model: {
            type: Object
        },
        rules: {
            type: Object
        }
    },
    methods: {
        validate (cb) {
            const task = this.$children.filter(child => child.prop).map(child => child.validate())
            Promise.all(task).then(() => cb(true)).catch(() => cb(false))
        }
    }
}
</script>

<style>

</style>
<template>
  <div>
    <label>{{ label }}</label>
    <div>
      <slot></slot>
      <p v-if="errMsg">{{ errMsg.message }}</p>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator'
export default {
  name: 'FormItem',
  inject: ['form'],
  props: {
    label: {
      type: String,
    },
    prop: {
      type: String,
    },
  },
  data() {
    return {
      errMsg: '',
    }
  },
  mounted() {
      this.$on('validate',() => {
          this.validate()
      })
  },
  methods: {
    validate() {
      // 判断当前组件是否需要验证？没有prop属性直接return
      if (!this.prop) return
      const value = this.form.model[this.prop]
      const rules = this.form.rules[this.prop]
      const description = { [this.prop]: rules }
      const validator = new AsyncValidator(description)
      return validator.validate({ [this.prop]: value }, (err) => {
        if (err) {
          this.errMsg = err[0]
        } else {
          this.errMsg = ''
        }
      })
    },
  },
}
</script>

<style></style>

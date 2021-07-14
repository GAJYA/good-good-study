<template>
  <div>
    <input v-bind="$attrs" :type="type" :value="value" @input="handleInput" />
  </div>
</template>

<script>
export default {
  name: 'Input',
  inheritAttrs: false, // 禁用继承父组件传过来的属性
  props: {
    value: {
      type: String,
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  methods: {
    handleInput(event) {
      //
      this.$emit('input', event.target.value)
      // 通知父组件要开始验证了
      // 不推荐使用依赖注入
      const findParent = (parent) => {
        //   循环找父组件
        // 看父组件的名字name是否是想要的
        // 是的话触发事件
        // 否则看是否还有父组件
        // 循环结束，父组件也找到了
        while (parent) {
          if (parent.$options.name === 'FormItem') {
            break
          } else {
            parent = parent.$parent
          }
        }
        return parent
      }
      const parent = findParent(this.$parent)
      if(parent) {
          parent.$emit('validate')
      }
    },
  },
}
</script>

<style></style>

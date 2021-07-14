<template>
  <my-form class="form" ref="form" :model="user" :rules="rules">
    <my-form-item label="用户名" prop="username">
      <my-input
        :value="user.username"
        @input="user.username = $event"
        placeholder="请输入用户名"
      ></my-input>
    </my-form-item>
    <my-form-item label="密码" prop="password">
      <my-input type="password" v-model="user.password"></my-input>
    </my-form-item>
    <my-form-item>
      <my-button type="primary" @click="login">登 录</my-button>
    </my-form-item>
  </my-form>
</template>

<script>
import myForm from './form/Form'
import myFormItem from './form/FormItem'
import myButton from './form/Button'
import myInput from './form/Input'
export default {
  name: 'FormTest',
  components: {
    myForm,
    myFormItem,
    myButton,
    myInput,
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
          },
          {
            min: 6,
            max: 12,
            message: '请输入6-12位密码',
          },
        ],
      },
    }
  },
  methods: {
    login() {
      console.log('button')
    //   return false
      this.$refs.form.validate(valid => {
        if (valid) {
          alert('验证成功')
        } else {
          alert('验证失败')
          return false
        }
      })
    },
  },
}
</script>

<style></style>

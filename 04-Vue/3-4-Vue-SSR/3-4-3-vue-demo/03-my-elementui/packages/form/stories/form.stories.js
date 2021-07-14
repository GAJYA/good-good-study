import myForm from '../' //导入的是index.js
import myFormItem from '../../formitem'
import myButton from '../../button'
import myInput from '../../input'

export default {
  title: 'form',
  component: myForm,
}

export const Login = () => ({
  components: { myForm, myFormItem, myButton,myInput },
  template: `
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
    `,
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('验证成功')
        } else {
          alert('验证失败')
          return false
        }
      })
    },
  },
})

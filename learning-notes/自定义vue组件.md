## 自定义vue组件

1. 执行`vue serve  xxx.vue`运行组件时，控制台报错

   ```bash
   These dependencies were not found:
   
   * core-js/library/fn/object/assign in ./node_modules/babel-runtime/core-js/object/assign.js
   * core-js/library/fn/symbol in ./node_modules/babel-runtime/core-js/symbol.js
   * core-js/library/fn/symbol/iterator in ./node_modules/babel-runtime/core-js/symbol/iterator.js
   
   To install them, you can run: npm install --save core-js/library/fn/object/assign core-js/library/fn/symbol core-js/library/fn/symbol/iterator
   ```

   问题原因：

    	1. element-ui依赖的core-js是2.x的版本，项目依赖的core-js是3.x版本导致的（反正通常就是某个插件依赖的core-js版本有冲突）

   解决办法：

   1. 先升级core.js尝试一下，并不行，继续报错

   2. 改core-js版本是不太行的，就改其他安装包的版本

      ```bash
      npm install async-validator@1.11.5
      ```

   3. 其实也可以暴力一点改一下async-validator的core-js引入路径？

   4. 或者再暴力一点，把它需要的文件copy进它找的那个文件夹里？反正我没试过，我看行

2. 两种项目的组织方式

   1. multirepo（multiple repository）

      1. 每个包对应一个项目

   2. monorepo（monolithc repository）

      1. 一个项目仓库中管理多个模块/包

      2. 通常把包放在根目录下一个指定的文件夹下，比如packages

      3. 目录结构

         ![image-20210714142200628](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20210714142200628.png)

      4. index.js中引入button组件，直接导出button

      5. 导出之前设置install方法，之后可以直接使用vue.use方法使用

         ```js
         
         ```

      6. 结构可以使用plop工程化工具自动生成目录结构

## Storybook

### storybook介绍

### storybook 安装

推荐使用yarn安装

```bash
# Add Storybook:
npx sb init
```

```bash
# Starts Storybook in development mode
yarn storybook
```

无法在空项目中运行

1. 在每个组件下创建一个stories文件夹

2. 修改.storybook文件夹下main.js配置的文件路径

3. 在stories里创建xx.stories.js

   ```js
   import myInput from '../' //导入的是index.js
   
   export default {
       title: 'input',
       component: myInput
   }
   
   export const Text = () => ({
      components: {myInput},
       template: '<my-input v-model="value"></my-input>',
       data(){
       return {
           value: 'admin'
       }
   }
   })
   
   export const Password =  () => ({
      components: {myInput},
       template: '<my-input type="password" v-model="value"></my-input>',
       data(){
       return {
           value: 'admin'
       }
   }
   })
   ```

login

```js
#packages\form\stories\form.stories.js

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

```



### storybook 运行报错

1. **cannot find modul ' vue-loader/lib/plugin'**

   原因：vue-loader版本问题，storybook @v6.3.4要求vue-loader@^15.9.7

   解决办法：重新安装对应的版本

2. **babel-loader报错validateOptions is not a function error**

   原因：Maybe it's a package manager bug that for some reason installed `schema-utils` v3.

   需要版本2.x

   解决办法： 重新安装 `schema-utils`@2.x

   吐槽：为什么会装成3.x呢，因为高版本vue-loader中安装的url-loader啊file-loader啊，tmd安装的是3.0的呢，呕~给爷整吐了

yarn 的工作区

1. 在根目录的package.json中设置

   ```json
   "private": true, // 提交时候禁止把当前根目录的内容进行提交
   "workspaces": ["packages/*"] // 要管理的所有的包的路径
   ```

2. 单独到组件中安装包

   ```bas
   yarn workspace 包名 add 依赖包 //包名指的是package.json中的name，不是指文件名
   ```

3. 直接执行`yarn `,会把相同的依赖提升到根目录下，特有的包会单独下载到自己的组件包下
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

### yarn 的工作区

管理包的依赖

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

### Lena使用介绍

1. 全局安装

   ```bash
   yarn global add lerna
   ```

2. 初始化

   ```bash
   lerna init
   ```

   * 当前项目没有Git会先Git初始化
   * 项目根目录添加lerna.json配置文件，里面有版本信息等
   * 在package.json中添加lerna的开发依赖

3. 发布（在package.json中添加script 直接执行 yarn lerna）

   ```bash
   lerna publish
   ```

4. 登录npm账号 发布

   1. npm whoami
   2. npm config get registry 获取镜像源
   3. 执行 yarn lerna 发布到npm上

   执行完毕后可能会报错没有权限发布包，可能是因为npm中有同名的包，修改package.json的name，提交git，再次执行发布



### Vue组件的单元测试

#### 安装依赖

* Vue Test Utils
* Jest 单元测试框架
* vue-jest 为jest提供的预处理器
* babel-jest 对测试代码进行降级处理

安装 -W在工作区

```bash
yarn add jest @vue/test-utils vue-jest babel-jest -D -W
```

#### 配置测试脚本

package.json

```json
"script": {
    "test": "jest"
}
```

jest.config.js项目根目录

```js
module.exports = {
    "testMatch": [], // 运行时候去哪儿找测试文件，默认找__test__文件中
    "moduleFileExtensions": [], //配置的文件后缀
    "transform" //转换
}
```

babel.config.js // 运行可能提示使用找不到babel，因为storybook的版本是7+，jest需要6版本，可以通过安装brige桥接解决

```js
presets: [
    [
        '@babel/preset-env'
    ]
]
```

#### Jest常用API

![image-20210715152304138](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20210715152304138.png)

#### Vue Test Utils 常用API

![image-20210715152240285](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20210715152240285.png)

组件测试

1. 测试输出的结果是否OK
2. 测试组件状态是否OK
3. 快照



### rollup打包

#### 安装依赖

rollup

rollup-plugin-terser 压缩

rollup-plugin-vue@5.1.9把vue2组件转换成js，最新版本是转换的vue3

vue-template-compiler

 package.json配置script 执行 rollup -c



### 其他

1. 删除文件夹插件 rimraf
2. 配置环境变量cross-env



### 使用plop

1. 安装
2. 写模板
3. 写配置文件
4. 执行命令
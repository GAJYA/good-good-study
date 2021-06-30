

## NuxtJS基础

### NuxtJS是什么？为什么出现，想要解决什么问题？

一个基于Vue.js生态的第三方开源服务端渲染应用框架；它可以帮我们轻松的使用vue.js技术栈构建同构应用

如何运作的？

nuxtjs集成了：

* Vue2
* Vue-Router
* Vuex（需要配置vux状态树配置项才会引入）
* vue服务器端渲染（排除使用mode：'spa'）
* vue-meta（？？？？）
* nuxt.js使用Webpack和vue-loader、babel-loader来处理代码的自动化构建工作（包括打包、代码分层、压缩等）

![image-20210617094024134](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20210617094024134.png)

#### 为什么出现，想要解决什么问题？

前后端分离，前端采用客户端渲染，单页应用方式有一些缺点，诸如：

* 首屏加载时间长，影响用户体验（等待js解析执行完）
* 不利于SEO

但是上面的问题在传统的服务端渲染是可以得到有效解决的，所以结合服务端渲染解决客户端渲染的问题，出现了同构渲染。

首屏渲染在服务端和客户端个执行一次，客户端执行的目的用于接管页面交互，服务端渲染解决首屏慢、SEO等问题。

### 基本使用

* 初始化一个全新的项目
* 已有的Node.js服务端项目
  * 直接把Nuxt当做一个中间件集成到Node Web Server中
* 现有的Vue.js项目
  * 非常熟悉Nuxt.js
  * 至少百分之10的代码改动

初始化方式

1. 使用create-nuxt-app脚手架工具

2. 创建自己的项目

   1. 创建目录文件，进入文件
   2. 新建package.json文件
   3.  安装nuxt
   4. 配置启动脚本
   5. 创建pages文件夹，创建index.vue/fun.vue
   6. 执行脚本运行nuxt

   启动报错3000端口占用，在package.json中新增config如下

   ```json
   "config": {
         "nuxt": {
             "host": "127.0.0.1",
             "port": "3333"
         }
     }
   ```

   

### 路由

#### 基本路由

会自动生成

#### 路由导航

* a标签
  * 会刷新整个页面，不要使用
* NuxtLink组件
* 编程式导航

#### 动态路由

* VueRouter动态路由匹配
* Nuxt.js动态路由
  * 需要创建以下划线为前缀的vue文件或目录

#### 嵌套路由

可以通过vue-router的子路由创建nuxt.js应用的嵌套路由

创建内嵌子路由，需要添加一个vue文件，同时添加一个与该文件同名的目录来存放子视图组件

在父组件.vue文件中增加<nuxt-child>用于显示子视图内容

#### 自定义路由配置

nuxt.config.js文件

### 视图

![image-20210617161312345](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20210617161312345.png)

#### 模板

可以定制nuxt.js默认的应用模板

定制化默认html模板需要在src文件夹下默认是应用根目录创建一个app.html的文件

#### 布局





### 异步数据

#### asyncData

当数据需要SEO可以在asyncData中返回

asyncData中`没有this`

#### 上下文对象

可以获取到包括路由信息的params,query，path等信息，以及vuex中的store等等，这样在asyncData中就可以使用了

###  开发过程中注意的点

1. asyncData中`没有this`，想要拿到数据可以从上下文context中获取

2. asyncData中return出的数据和data中的数据会合并（？？？）

3. 路由地址中的query发生改变，默认是不会触发页面刷新的，如果希望页面刷新可以配置`watchQuery`

4. vuex中的store，在服务端渲染期间运行的都是同一个实例，为了防止数据冲突，务必把state定义成一个函数，返回数据对象

5. nuxt中特殊的action方法nuxtServerInit， 在服务端渲染期间自动调用，

   作用：初始化容器数据，传递数据给客户端使用

6. 关于登录权限可以使用中间件完成，

   ```js
   middleware: 'authenticated', // 在路由匹配组件渲染之前会先执行中间件处理，如果有多个中间件可以写成数组的形式
   ```

7. 插件机制可以获取到context上下文对象（query, params, req, res, app实例，store...)

   可以处理登录token令牌携带的问题，因为服务器端无法通过`import store from '@/store'`拿到存在vuex中state的数据，从代码层面看state此时是个函数

8. 插件导出函数必须作为默认成员导出，default只能有一个

9. 可以利用插件机制设置全局过滤器等

10.  数据返回的有引号，去除掉引号

    ```js
    // 此处decodeURI内的值可以通过encodeURI(tags[0])获取到，就哪项不正经就传哪项进去
    const xx = decodeURI('%E2%80%8C')
    const reg = new RegExp(xx, 'g')
    tags = tags.map(tag => tag.replace(reg, '')).filter(tag => tag.length)
    ```

11. 来了，讲一讲遇到的天坑，

    ![image-20210628170926073](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20210628170926073.png)

    项目运行突然报错，如图所示，最后的解决办法是把vscode的local-history插件禁用了，然后重启vscode，就好了。

    搜了下local-history的作用，local-history插件每次修改保存文件时, 都会在根目录生成一个.history目录，里面是修改记录，不知道它是不是找错文件或者啥了的，但是目前来讲我遇到的问题这样这样那样就可以让它启动起来。

12. 昨儿还遇到个点击按钮，页面刷新的问题，但是按钮本身是没有a链接啊啥的，只是绑定了一个修改客户信息的方法，最终检查的原因是接口名写错。。。。。。orz

### Nuxt.js发布部署

1. 先执行nuxt build进行打包
2. 把打包后的.nuxt static nuxt.config.js package.json package-lock.json压缩后上传到服务器端
3. 在服务器端解压缩
4. 执行 nuxt start命令，让项目运行起来
5. 外部可通过ip加端口号访问

在服务器上安装node

安装pm2，使用pm2启动服务

pm2就是一个管理node进程的工具，通过它可以把项目运行在后台

pm2常用命令（神似nginx）

![image-20210628133353111](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20210628133353111.png)

### CI/CD(持续化的集成和部署)

![image-20210628134634321](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20210628134634321.png)

CI/CD服务

* Jenkins
* Gitlab CI
* GitHub Actions
* Travis CI
* Cicle CI

目的都是持续集成持续部署

环境准备（GitHub actions）

* linux服务器
* 代码提交到github

github

settings------developer-settings ------personal access tokens

generat token ------设置权限，勾选第一个，拥有对仓库操作的权限

复制token 令牌，之后要用

找到代码仓库----settings -----secrets ----name建议写成TOKEN，

把刚刚的token复制内容区

### 配置GitHub Actions执行脚本

* 在项目根目录创建.github/workflows目录

* 下载main.yml到workflows

* 修改配置

  * main.yml中新加一个要打包的文件pm2.config.json
  * main.yml中的secrets用到的字段在github对应的项目中配置好
  * wget 后的地址换为自己的项目地址（注意不要加上.git，否则可能会在deploy步骤报错，比如找不到pm2.config.json这样的错)

* 配置pm2配置文件pm2.config.json

  ```json
  {
      "apps": {
          "name": "RealWorld",
          "script": "npm",
          "args": "start"
      }
  }
  ```

  cd 到服务器上放代码的文件

* 提交更新

* 查看自动部署状态

* 访问网站

* 提交更新

yml文件中根据v开头的tag触发自动更新

操作步骤

```bash
git add .
git commit -m 'sth here'
git tag v0.1.0 // 打标签
git tag // 查看所有的标签
git push origin v0.1.0 // 提交，触发自动部署
```

自动部署，build阶段遇到报错cookieParser找不到，检查cookieParser的大小写问题，应该是小写cookieparser


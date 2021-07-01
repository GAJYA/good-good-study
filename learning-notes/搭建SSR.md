## 渲染一个Vue实例

```js
const Vue = require('vue')
const express = require('express')
const fs = require('fs')
const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('index-template.html', 'utf8')
})

const server = express()

server.get('/', (req, res) => {
  const app = new Vue({
    template: `
            <div id="app">
                <h1>{{message}}</h1>
            </div>
        `,
    data: {
      message: '你好吖', // 中文可能展示乱码，需要设置编码格式
    },
  })

  renderer.renderToString(app, (err, html) => {
    // if (err) throw err
    if (err) {
      return res.status(500).end('Internal Server Error')
    }
    console.log(html) // <div id="app" data-server-rendered="true"><h1>hello world</h1></div>
    // 模板根节点添加的自定义数据data-server-rendered，目的是在做客户端渲染激活接管的一个入口
    // 使用express
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(html)
  })
})

server.listen(3333, () => {
  console.log('server running at port 3000')
})

```



### 服务端返回的页面包含中文，浏览器端展示时候乱码：

* response设置响应头

  ```js
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  ```

* 返回完整的html页面

  ```js
  res.end(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
          </head>
          <body>
              ${html}
          </body>
          </html>
      `)
  ```

  建议两个都设置

* 把页面模板单独放在一个页面中

  1. 设置index-template.html文件
  2. 在body中写注释 vue-ssr-outlet，是一个标记（左右不要有空格字符）
  3. createRenderer对象可以配置参数template，值可以通过文件读取的方式拿到fs.readFileSync
  4. 读取的文件默认是buffer格式，设置读取的结果格式

### 在模板中使用外部的数据

renderToString方法第二个参数可以传入模板中需要的数据

此处有问题，可能渲染不出来，需要重新启动一下服务，才会重新加载模板内容

渲染的标签会被解析成字符串，可以使用三个大括号的形式，`{{{ meta }}}`

这样vue就不会解析成字符串了

### 构建配置-基本思路

服务端渲染只是把vue实例处理成纯静态的HTML字符串，发送给客户端，对于vue实例本身的动态处理并没有实现。

同构渲染

![image-20210629135700638](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20210629135700638.png)

要能处理客户端的页面动态交互：

1. source

   1. 组织基本代码结构

   2. 通过webpack进行打包构建

      1. 代码中的vue组件，import等语法都需要进行打包构建运行

      2. 安装依赖

         ```bash
         npm i vue vue-server-renderer express cross-env
         ```

         cross-env  通过npm scripts设置跨平台环境变量

         vue-server-renderer  vue服务端渲染工具

      3. 安装开发依赖

         ```bash
         pm i -D webpack webpack-cli webpack-merge webpack-node-externals @babel/core
         @babel/plugin-transform-runtime @babel/preset-env babel-loader css-loader url-loader file-loader rimraf vue-loader vue-template-compiler friendly-errors-webpack-plugin
         ```

         webpack-node-externals         排除 webpack 中的 Node 模块

         rimraf                                        基于 Node 封装的一个跨平台 rm -rf 工具

         friendly-errors-webpack-plugin            友好的 webpack 错误提示

2. 服务端渲染是如何输出的流程

   1. server-bundle.json是当前服务端通过ntry-server打包后的文件
   2. renderer在执行的时候会找到entry-server的

3. 客户端渲染是如何接管的流程

   1. cilent.manifest客户端打包资源的构建清单
   2. 会自动把initial中的文件自动加载到首页中
   3. async中是异步资源信息
   4. modules是针对原始模块做的依赖信息说明，每个模块都有一个特殊的标识，数组里存的是用到的所有的文件，编码表示
   5. 在开发模式下，vue会推断客户端生成的虚拟dom,是否与从服务器渲染的dom结构匹配，如果无法匹配，它会退出混合模式，丢弃现有的dom重新开始渲染，在生产模式下，此检测会被跳过，以避免性能损耗

4. 使用webpack-dev-middleware

5. 使用webpack-hot-middleware热更新

   1. 在开发环境设置某些内容
   2. 可能会报错，原因是chunkhash
   3. 在热更新模式下不要使用hash，确保一致的文件名
   4. 关闭日志 配置noInfo或者quiet为true
   5. 重新启动配置reload =  true

6. 安装vue-router

   1. 创建pages文件放组件，包括home。about。404页面
   2. 创建router —— index.js
   3. Vue.use(VueRouter)
   4. 导出一个createRouter = （） =》 {} ，使用函数目的是避免不同路由状态的交叉污染
   5. new Vuerouter()
   6. mode在同构中必须使用history模式，可以兼容后端
   7. 配置routes中配置home，about和404页面，通常404放最后，以*号匹配
   8. 把路由注册到跟实例中，app.js中拿到createRouter
   9. 把路由挂载到vue根实例中，把router和app一并导出，这样外部就可以拿到
   10. 把vuerouter适配到entry-server中，可参考官方文档
   11. async默认返回promise，可以把return new Promise去掉
   12.  server.js中的rendertoString的第一个参数对象就是router.context拿到的内容
   13. 服务端路由设置为*，server.get(`"*"`) 任何请求都会走到哪里
   14. 客户端也需要做一个适配，entry-client




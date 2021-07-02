const Vue = require('vue')
const express = require('express')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const setupDevServer = require('./build/setup-dev-server')
// const serverBundle = require('./dist/vue-ssr-server-bundle.json')
// const clientManifest = require('./dist/vue-ssr-client-manifest.json')
// const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
//     template: fs.readFileSync('index.template.html', 'utf-8'),
//     clientManifest
// })
const server = express()

// 挂载一个处理资源的中间件
// 当请求到以/dist开头的资源时候尝试去dist目录下查找
server.use('/dist', express.static('./dist'))

let renderer
let onReady
const isProd = process.env.NODE_ENV === 'production'
if (isProd) {
    console.log('aaaaaaaaaaa');
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const template = fs.readFileSync('./index.template.html', 'utf-8')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest
  })
} else {
    console.log('bbbbbbbbbb');
  // 开发模式   监视源代码的改动，然后进行打包构建，重新生成renderer渲染器
  // 参数2是一个回调函数，回调函数在每次监视打包完成后都会被执行
  onReady = setupDevServer(server, (serverBundle, template, clientManifest) => {
    renderer = createBundleRenderer(serverBundle, {
      template,
      clientManifest
    })
  })
}
// const renderer = require('vue-server-renderer').createRenderer({
//     template: fs.readFileSync('index.template.html', 'utf-8')
// })

const render = (req, res) => {
  //   const app = new Vue({
  //     template: `
  //             <div id="app">
  //                 <h1>{{message}}</h1>
  //             </div>
  //         `,
  //     data: {
  //       message: '你好吖', // 中文可能展示乱码，需要设置编码格式
  //     },
  //   })

  //   不需要单独创建实例，renderer会自动找到entry-server然后自动触发创建实例
  //   renderer.renderToString(app, {
  renderer.renderToString(
    {
      title: 'whataaa',
      meta: `<meta name="viewport" content='whataaa'>`
    },
    (err, html) => {
      // if (err) throw err
      if (err) {
        return res.status(500).end('Internal Server Error')
      }
      console.log(html) // <div id="app" data-server-rendered="true"><h1>hello world</h1></div>
      // 模板根节点添加的自定义数据data-server-rendered，目的是在做客户端渲染激活接管的一个入口
      // 使用express
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(html)
    }
  )
}

server.get(
  '/',
  isProd
    ? render
    : async (req, res) => {
        // 等待有了renderer渲染器以后，调用render进行渲染
        // 拿到构建的状态，构建成功后再渲染
        await onReady
        render(req, res)
      }
)

server.listen(3333, () => {
  console.log('server running at port 3333')
})

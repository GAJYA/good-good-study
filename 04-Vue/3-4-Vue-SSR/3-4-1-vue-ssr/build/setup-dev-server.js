const path = require('path')
const fs = require('fs')
const chokidar = require('chokidar')
const webpack = require('webpack')
const resolve = file => path.resolve(__dirname, file)
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
module.exports = (server, callback) => {
    let ready //promise中的reslove
    const onReady = new Promise(res => ready = res)

    // 监视构建 --》 更新renderer
    // 定义三个变量
    let template
    let serverBundle
    let clientManifest
    // 函数update在调用callback前判断三个资源都构建好后
    // callback
    const update = () => {
        if (template && serverBundle && clientManifest) {
            ready()
            callback(serverBundle,template, clientManifest)
        }
    }
    // 调用update的时机
    // 监视构建template ——> 调用update ——> 更新renderer渲染器
    // 初始时候把文件读取出来，发生变化时候再读出来
    const templatePath = path.resolve(__dirname,'../index.template.html')
    template = fs.readFileSync(templatePath, 'utf-8')
    update()
    // 实现监视功能  推荐使用 chokidar第三方包实现，因为原生的fs.watch  fs.watchFile不太好用
    chokidar.watch(templatePath).on('change', () => {
        console.log('template change');
        template = fs.readFileSync(templatePath, 'utf-8')
        update()
    })
    // 监视构建serverBundle ——> 调用update ——> 更新renderer渲染器
    const serverConfig = require('./webpack.server.config')
    const serverCompiler = webpack(serverConfig)
    const serverDevMiddleware = devMiddleware(serverCompiler, {
        logLevel: 'silent', // 关闭日志输出，由friedlyErrorsWebpackPlugin处理
    })
    // 相当于注册了个插件
    serverCompiler.hooks.done.tap('server', () => {
       serverBundle = JSON.parse(serverDevMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8'))
        update()
    })
    /** serverCompiler.watch({}, (err, stats) => {
         // 抛出webpack本身的一些错误，如配置错误
         if (err) throw err
         // 代码中有错误
         if(stats.hasErrors()) return
         console.log('success');
         // 不要使用require导入json文件，因为require有缓存，直接读取文件读出来
         serverBundle = JSON.parse(fs.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8'))
         // console.log(serverBundle);
         update()
     }) */
    // 监视构建clientManifest ——> 调用update ——> 更新renderer渲染器
    // webpack在打包构建中默认把构建结果存储在磁盘中，开发模式频繁修改代码触发构建，会频繁的去磁盘中存取数据，这个操作相对较慢，建议开发环境可以存入内存中
    // 推荐使用memfs第三方工具，配置在webpack中，打包后会输出在内存中
    // 或者官方的webpack-dev-middleware
    const clientConfig = require('./webpack.client.config')
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
    clientConfig.entry = [
        'webpack-hot-middleware/client?quiet=true&reload=true', 
        clientConfig.entry.app
    ]
    clientConfig.output.filename = '[name].js' // 热更新模式下不开启哈希
    const clientCompiler = webpack(clientConfig)
    const clientDevMiddleware = devMiddleware(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        logLevel: 'silent', // 关闭日志输出，由friedlyErrorsWebpackPlugin处理
    })
    // 相当于注册了个插件
    clientCompiler.hooks.done.tap('client', () => {
        clientManifest = JSON.parse(clientDevMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-client-manifest.json'), 'utf-8'))
        update()
    })
    server.use(hotMiddleware(clientCompiler, {
        log: false // 关闭它本身的日志输出
    }))
    // 将clientMiddleware挂载到express服务中，提供对其内部内存中数据的访问
    server.use(clientDevMiddleware)
    return onReady
}
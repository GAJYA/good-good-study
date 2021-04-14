const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
    mode: 'none', //development  production
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: 'dist/', //默认为空字符串表示根目录，dist后的/不可省略，否则会直接dist+资源路径，会找不到
    },
    module: {
        rules: [
            // webpack只是用来打包工具
            // 通过babel-loader来编译转换代码
            {
                test: /\.js$/,
                // use:'babel-loader' // babel本身只是一个平台，完成编译需要借助于插件，@babel/preset-env是一个插件集合，可直接使用
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // {
            //     test: /\.jpg$/,
            //     use: 'file-loader'
            // },
            {
                test: /\.jpg$/,
                // use: 'url-loader',
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024 //限制大小10kb以下才使用url-loader否则使用file-loader，所以这种情况两个loader都需要安装
                    }
                }
            },
            // Module build failed (from ./node_modules/html-loader/dist/cjs.js):TypeError: this.getOptions is not a function
            // 报错原因loader版本问题，一般装包的时候也会提示依赖什么包，要求webpack什么版本
            // 想锤爆这个1.x版本的html-loader的狗头，一步一报错？？？？？
            // 一次性说完错误原因不行？？？？不行吗？？？？？啥破玩意儿整那么多有的没的属性，呕，都给爷整乐了
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attributes: {
                            list:[
                                {attribute: 'src',type: 'src',tag: 'img'},
                                {attribute: 'href',type: 'src',tag: 'a'}
                            ]
                        }
                    }
                }
                
            },
            // loader为多个时候从后向前执行
            // 最终转换结果必须为一个js文件
            {
                test: /\.md$/,
                use: [
                    'html-loader',
                    './markdown-loader'
                ]
            },
        ]
    },
    devServer: {
        contentBase: './public', //指定为额外的资源加载路径，一般用于静态资源
        outputPath: path.join(__dirname, 'dist'), 
        // 希望在同域名下发送 API 请求 ，对某些URL进行代理 
        proxy:{
            '/api': {
                target: 'https://api.github.com',
                pathRewrite:{ //如果你不想始终传递 /api ，则需要重写路径
                    '^/api': ' '
                },
                changeOrigin: true // changeOrigin默认是false：请求头中host仍然是浏览器发送过来的host,如果设置成true：发送请求头中host会设置成target
            }
        },
        hot: true, //开启热更新，hot执行失败会回退进行自动刷新
        // hotOnly: true, //开启热更新，执行失败时候不进行自动刷新
    },
    // source map映射方式，有12种，各有千秋，自行查阅，webpack官网.
    // 开发环境推荐使用该模式，假如你代码不太长的话。因为报错只显示行号不显示列。
    // 生产环境推荐none，因为source map会暴露源代码，视情况而定，比如我们这种开发。熬夜加班(/"≡ _ ≡)/~┴┴
    devtool: 'cheap-module-eval-source-map', 
    // 插件使用
    plugins: [
        // 删除目录
        new CleanWebpackPlugin(),
        // 自动生成html的插件，自动引入打包好的文件
        new HtmlWebpackPlugin({
            title: 'lunaJan',
            meta: {
                viewport: ''
            },
            template: './src/index.html' // 模板地址，模板中可以使用ejs语法
        }),
        // 多页面，重新new一个实例
        new HtmlWebpackPlugin({
            filename: 'about.html'
        }),
        // 直接把public下的文件复制进dist文件中
        // new CopyWebpackPlugin([
        //     'public/**/*'
        // ])
        // new CopyWebpackPlugin({patterns:['public/**/*']}), // 通常生产环境的配置需要，开发环境可以指定contentBase

        // 热更新模块HMR，webpack自带的插件。实时替换，不会完全刷新应用，解决了自动刷新导致的页面状态消失的问题。
        // css文件等由于style-loader和css-loader已经内部做了处理，可以直接进行热更新。因为css文件的处理有规则可循，简单！
        // js文件需要手动处理修改后进行热更新。需要使用模块热更新处理函数module.hot.accept()函数
        new webpack.HotModuleReplacementPlugin(), 
    ]
}
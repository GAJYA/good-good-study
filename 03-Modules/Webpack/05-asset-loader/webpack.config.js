const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
    mode: 'none',
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
        outputPath: path.join(__dirname, 'dist')
    },
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
        new CopyWebpackPlugin({patterns:['public/**/*']}),
    ]
}
/*
 * @Author: your name
 * @Date: 2021-07-04 16:21:06
 * @LastEditTime: 2021-07-04 16:54:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /3-4-1-vue-ssr/build/webpack.client.config.js
 */
/**
 * 客户端打包配置
 */
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  entry: {
    app: './src/entry-client.js' // 相对路径是相对于执行打包相对的路径，有点子怪哦
  },

  module: {
    rules: [
      // ES6 转 ES5
    //   只需要客户端操作，服务端本身是支持es6的
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
    ]
  },

  // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
  // 以便可以在之后正确注入异步 chunk。
  optimization: {
    splitChunks: {
      name: "manifest",
      minChunks: Infinity
    }
  },

  plugins: [
    // 此插件在输出目录中生成 `vue-ssr-client-manifest.json`。这个文件描述了客户端打包结果中的依赖以及需要加载的信息
    new VueSSRClientPlugin()
  ]
})

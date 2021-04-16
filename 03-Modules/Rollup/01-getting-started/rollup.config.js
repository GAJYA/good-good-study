// rollup内部做了处理，支持使用esmodule语法,代码不会经过 Babel 等类似工具编译，所以只能使用所用 Node.js 版本支持的 ES2015 语法
// 运行在node环境中
// 使用配置文件，在命令行里要加上--config或者-c
// 使用自定义的配置文件，yarn rollup --config my.config.js
// 命令行选项将会覆盖配置文件中的选项

import json from 'rollup-plugin-json'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
    input: './main.js', // 必须，入口文件
    // input: './index.js', // 必须，入口文件
    output: { // 必须，（如果要输出多个，可以是一个数组
        // 核心选项
        // file: 'dist/bundle.js', // 必须
        // format: 'cjs', // 必须 可选值amd, cjs, esm, iife, umd
        dir: 'dist', //多文件方式输出
        format: 'amd',
    },
    plugins: [
        json(),
        nodeResolve(),
        commonjs()
    ]
}
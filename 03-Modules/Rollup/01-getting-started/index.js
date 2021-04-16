import {msg} from './src/message.js'

import {sayhi, create, getversion} from './src/log.js'



sayhi(msg)

getversion()

// 命令行执行方式
// yarn rollup ./index.js --file dist/bundle.js --format iife
//             入口文件           出口文件           打包格式  自执行函数

// 内置tree-shaking，会忽略没有使用到的代码 dead-code
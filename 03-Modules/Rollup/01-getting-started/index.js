import {msg} from './src/message.js'

import {sayhi, create, getversion} from './src/log.js'

import cjs from './src/cjs.module.js'

import _ from 'lodash-es'


console.log(_.camelCase('HEAD'));

sayhi(msg)

getversion()

console.log(cjs.bar);
// 命令行执行方式
// yarn rollup ./index.js --file dist/bundle.js --format iife
//             入口文件           出口文件           打包格式  自执行函数

// 内置tree-shaking，会忽略没有使用到的代码 dead-code
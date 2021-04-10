import { name } from './module.mjs'

console.log(name)

// 使用esmodule
// 内置对象内部做了处理，支持下面的写法
import { writeFileSync } from 'fs'
import fs from 'fs'

fs.writeFileSync('./bar.txt', 'whatever you say')
writeFileSync('./foo.txt', 'yohoooo~')

// import _ from 'lodash'

// console.log(_.camelCase('hello world'));

// 报错，原因，export后的{}不是对象，是一种固定用法，
// import也不是解构赋值，是固定用法
// import { camelCase } from 'lodash' 

import pkg from 'lodash';
const { camelCase } = pkg;
console.log(camelCase('hello world'));



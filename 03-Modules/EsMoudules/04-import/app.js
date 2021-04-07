// import { default as fooName } from './module.js'
// console.log(fooName)

// import { name } from './module.js'
import { name } from '/EsMoudules/04-import/module.js'
import {lowercase} from '/EsMoudules/04-import/utils/index.js'
// import { lowercase } from 'http://localhost:3000/EsMoudules/04-import/utils/index.js'

console.log(lowercase('HOME'));
console.log(name)

// 只需要执行的时候可以引入一个空的
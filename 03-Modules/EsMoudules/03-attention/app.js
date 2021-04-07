// import { default as fooName } from './module.js'
// console.log(fooName)

// 非解构
import { name, age } from './module.js'
console.log(name, age)

// 导入的成员是一个只读成员，不可修改
setTimeout(() => {
    console.log(name, age)
},1500)

name = 'babe'
console.log(name);
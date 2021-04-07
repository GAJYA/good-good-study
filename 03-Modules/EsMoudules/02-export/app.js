// import { default as fooName } from './module.js'
// console.log(fooName)

import { name, hello as sayHi, Human } from './module.js'
console.log(name)
console.log(new Human());
sayHi()
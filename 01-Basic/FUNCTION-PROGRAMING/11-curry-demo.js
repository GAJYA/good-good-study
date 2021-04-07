// 柯里化案例
// ''.match(/\s+/g)
// ''.match(/\d+/g)

const _ = require('lodash')


function match(reg, str){
    return str.match(reg)
}

const match2 = _.curry(match)

const haveSpace = match2(/\s+/g)
const haveNumber = match2(/\d+/g)

console.log(haveSpace('helloworld'));
console.log(haveNumber('hello2world'));


// filter柯里化
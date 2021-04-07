// lodash中的函数组合演示  flowRight
const _ = require('lodash')

const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUpper = s => s.toUpperCase()

// const f = _.flowRight(_.toUpper, _.first, _.reverse)
//  reverse会改变原数组
const f1 = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse)
const f2 = _.flowRight(_.toUpper, _.flowRight( _.first,_.reverse))

const array = ['a', 'b', 'c']
// console.log(f(array));
console.log(f1(array));
console.log(f2(array));
// lodash中的函数组合演示  flowRight
const _ = require('lodash')

const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUpper = s => s.toUpperCase()

const f = _.flowRight(toUpper, first, reverse)

console.log(f(['a','b','v']));


// folktale中的compose、curry
const {compose,curry} = require('folktale/core/lambda')

const {toUpper, first} = require('lodash/fp')

// folktale中的curry函数用法，第一个参数指明后面参数个数
let f = curry(2,(x,y) => {
    return x + y
})

console.log(f(1, 2));
console.log(f(1)(2));


let f1 = compose(toUpper, first)
console.log(f1(['a', 'b', 'c']));
// 函数组合 调试
// NEVER SAY DIE --> never-say-die

const _ = require('lodash')

// _.split()
const split = _.curry((sep, str) => _.split(str, sep))

// _.toLower

const join = _.curry((sep, arr) => _.join(arr, sep))
const map = _.curry((sep, arr) => _.map(arr, sep))

const log = v => {
    console.log(v);
    return v
}
const trace = _.curry((tag,v) => {
    console.log(tag, v);
    return v
})

const f = _.flowRight(join('-'),trace('map'),map(_.toLower),trace('split'), split(' '))



console.log(f('NEVER SAY DIE'));
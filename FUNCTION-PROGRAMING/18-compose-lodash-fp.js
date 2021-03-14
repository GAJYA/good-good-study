// 
const fp = require('lodash/fp')
const _ = require('lodash')

const f = fp.flowRight(fp.join('-'), fp.map(fp.toLower), fp.split(' '))

console.log(f('NEVER SAY DIE'));
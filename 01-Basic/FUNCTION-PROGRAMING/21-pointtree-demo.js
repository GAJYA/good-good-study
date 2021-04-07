// 使用 Point Free 的模式，把单词中的首字母提取并转换成大写
// world will web => W. W. W

const fp = require('lodash/fp')

// const firstLetterToUpper = fp.flowRight(fp.join('. '),fp.map(fp.first),fp.map(fp.toUpper),fp.split(' '))
// 減少map的使用次數，提高性能，先把toUpper和first組合起來，一起放到map中
const firstLetterToUpper = fp.flowRight(fp.join('. '),fp.map(fp.flowRight(fp.first, fp.toUpper)),fp.split(' '))

console.log(firstLetterToUpper('world will web'));
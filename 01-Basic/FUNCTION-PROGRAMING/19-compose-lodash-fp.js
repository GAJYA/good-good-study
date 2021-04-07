// lodash中的fp模塊
const _ = require('lodash')

console.log(_.map(['23', '8', '10'], parseInt));
// parseInt('23', 0, array)
// parseInt('8', 1, array)
// parseInt('10', 2, array)

// lodash中的函數接受3個參數

// parseInt 第二個參數的取值範圍是 2-36
// 傳0相當於是10進制數據
parseInt()
// 預期的值
// 封裝一個parseInt

const fp = require('lodash/fp')

//  lodash/fp中的map函數接受1個函數，且fp中函數優先，數據靠後
console.log(fp.map(parseInt, ['23', '8', '10']));
const path = require('path')

console.log(path.join(__dirname, 'foo'))

// 文件后缀名为js时候，报错 require is not defined

// 文件名修改为cjs可正常运行
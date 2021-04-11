// 运行在node环境中
// 可以直接使用node的内置对象
const path = require('path')

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'output')
    }
}
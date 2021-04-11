const path = require('path')
module.exports = {
    mode: 'development', // 开发模式的打包方式，会提升打包速度，默认是production，会开启一些优化，比如自动压缩代码，生产环境更适用
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'output'),
    }
}
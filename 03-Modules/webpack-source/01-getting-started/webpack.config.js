const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output:{
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'), // 必须为绝对路径
    },
    devtool: 'source-map',
    mode: 'none',
    plugins: [
        new HtmlWebpackPlugin()
    ]
}
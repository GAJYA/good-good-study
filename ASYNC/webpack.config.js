devServer: {
    contentBase: './build',
    host:'localhost',
    port:8080, //端口
    open: true, // 自动打开页面
}
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode:'none',
    stats:'none',
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin()
    ]
}
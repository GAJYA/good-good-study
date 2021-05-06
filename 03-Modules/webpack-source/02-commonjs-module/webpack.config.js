const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    }, 
    mode: 'none',
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin()
    ]
}
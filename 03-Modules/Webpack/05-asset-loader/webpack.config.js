const path = require('path')
module.exports = {
    mode: 'none',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: 'dist/', //默认为空字符串表示根目录，dist后的/不可省略，否则会直接dist+资源路径，会找不到
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // {
            //     test: /\.jpg$/,
            //     use: 'file-loader'
            // },
            {
                test: /\.jpg$/,
                // use: 'url-loader',
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024 //限制大小10kb以下才使用url-loader否则使用file-loader，所以这种情况两个loader都需要安装
                        }
                    }
                ]
            },
        ]
    }
}
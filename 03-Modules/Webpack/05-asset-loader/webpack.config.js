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
            {
                test: /\.jpg$/,
                use: 'file-loader'
            },
            // {
            //     test: /\.jpg$/,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 10 * 1024
            //             }
            //         }
            //     ]
            // },
        ]
    }
}
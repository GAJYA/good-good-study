// 读取文件
// 转换流
// 写入流
// 基于流的构建系统

const fs = require('fs')
// 转换流
const { Transform } = require('stream')

exports.default = () => {
    // 读取流
    const read = fs.createReadStream('normal.css')
    const write = fs.createWriteStream('normal.min.css')
    const transform = new Transform({
        transform:(chunk,encoding,callback) => {
            // chunk转换成string
            const input = chunk.toString()
            // 去掉空格和注释
            const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
            callback(null, output)
        }
    })

    read.pipe(transform).pipe(write) //写入
    return read
}
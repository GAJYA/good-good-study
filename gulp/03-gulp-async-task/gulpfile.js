const fs = require('fs')

exports.callback = done => {
    console.log('callback is working');
    done()
}
// 任务失败的情况
exports.callback_err = done => {
    console.log('callback is working');
    done(new Error('callback_err task failed~'))
}

// 使用promise
exports.promise = () => {
    console.log('promise task is working');
    return Promise.resolve()
}
exports.promise_err = () => {
    console.log('promise task is working');
    return Promise.reject(new Error('task is failed'))
}

const timer = time => {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}
// 使用async
// 只要node版本支持，8.0以上就可以使用
exports.async = async() => {
    await timer(1000)
    console.log('async task');
}

// 读取package中的内容写入到tmp中，返回readstream
// read stream中触发了on end方法，实现了done（）
exports.stream = () => {
    const readStream = fs.createReadStream('package.json')
    const writeStream = fs.createWriteStream('tmp.json')
    readStream.pipe(writeStream)
    return readStream
}
exports.stream2 = done => {
    const readStream = fs.createReadStream('package.json')
    const writeStream = fs.createWriteStream('tmp.json')
    readStream.pipe(writeStream)
    readStream.on('end',() => {
        done()
    })
}


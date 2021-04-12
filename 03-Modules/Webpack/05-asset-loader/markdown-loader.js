const marked = require('marked')

// 每个loader都会导出一个函数
module.exports = source =>{
    // console.log(source);
    // // return 'hello world'
    // return `console.log('hello world');`

    const html = marked(source)
    return html // 拿到的html再使用html-loader进行转换
    // return `export default ${JSON.stringify(html)}`
    // return `module.exports = ${JSON.stringify(html)}`
}
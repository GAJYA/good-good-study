const express = require('express')
const fs = require('fs')

const app = express()

app.get('/', (req, res) => {
    // 1. 获取页面模板
    // 读取文件，默认返回结果是buffer，可以通过指定第二个参数，返回为字符串
    const templateStr = fs.readFileSync('./index.html', 'utf-8')
    // console.log(templateStr);
    // 2. 获取数据
    // 通过JSON.parse()把json格式的字符串转换成对象
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
    console.log(data);
    // 3. 渲染：数据 + 模板 = 最终结果
    // 4. 把渲染结果发送给客户端
    res.send(templateStr)
})

app.listen(3333, () => console.log('running...'))
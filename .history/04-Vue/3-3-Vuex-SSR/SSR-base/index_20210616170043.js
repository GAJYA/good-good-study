const express = require('express')

const app = express()

app.get('/', (req, res) => {
    // 1. 获取页面模板
    const templateStr = fs.readFileSync('./index.html', 'utf')
    // 2. 获取数据
    // 3. 渲染：数据 + 模板 = 最终结果
    // 4. 把渲染结果发送给客户端
    res.send('hello world')
})

app.listen(3333, () => console.log('running...'))
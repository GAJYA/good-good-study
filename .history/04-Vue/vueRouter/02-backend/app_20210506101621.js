const path = require('path')

const history = require('connect-history-api-fallback')

const express = require('express')

const app = express()
// 注册处理history模式的中间件
// app.use(history())
// 处理静态资源的中间件，网站根目录（../web)
app.use(express.static(path.join(__dirname, '../web')))


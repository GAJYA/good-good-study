const path = require('path')

const history = require('connect-history-api-fallback')

const express = require('express')

const app = express()
// 注册处理history模式的中间件
// app.use(history())
// 
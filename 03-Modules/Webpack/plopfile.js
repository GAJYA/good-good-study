// plopfile.js
// Plop 入口文件，需要导出一个函数
// 此函数接收一个 plop 对象，用于创建生成器任务
const fs = require('fs')
module.exports = plop => {
    plop.setGenerator('modules', { // 'component'生成器的名字
      description: 'create a webpack dir',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'Your dir name',
          default: 'webpack-demo'
        }
      ],
      actions: [
        {
          type: 'add', // 代表添加文件
          path: '{{name}}/webpack.config.js',
          templateFile: 'plop-templates/webpack.config.js'
        },
        {
          type: 'add', // 代表添加文件
          path: '{{name}}/src/module.js',
          templateFile: 'plop-templates/src/module.js'
        },
        {
          type: 'add', // 代表添加文件
          path: '{{name}}/src/main.js',
          templateFile: 'plop-templates/src/main.js'
        },
        {
          type: 'add', // 代表添加文件
          path: '{{name}}/index.html',
          templateFile: 'plop-templates/index.html'
        },
        {
          type: 'add', // 代表添加文件
          path: '{{name}}/package.json',
          templateFile: 'plop-templates/package.json'
        },
      ]
    })
  }
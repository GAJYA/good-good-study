// plopfile.js
// Plop 入口文件，需要导出一个函数
// 此函数接收一个 plop 对象，用于创建生成器任务
const fs = require('fs')
module.exports = plop => {
    plop.setGenerator('modules', { // 'component'生成器的名字
      description: 'create a modules dir',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'Your dir name',
          default: 'MyModules'
        }
      ],
      actions: [
        {
          type: 'add', // 代表添加文件
          path: '{{name}}/app.js',
          templateFile: 'plop-templates/app.hbs'
        },
        {
          type: 'add', // 代表添加文件
          path: '{{name}}/module.js',
          templateFile: 'plop-templates/module.hbs'
        },
        {
          type: 'add', // 代表添加文件
          path: '{{name}}/index.html',
          templateFile: 'plop-templates/index.html.hbs'
        },
      ]
    })
  }
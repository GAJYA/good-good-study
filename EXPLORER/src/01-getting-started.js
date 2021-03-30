// @flow
function sum(a:number, b:number) {
    return a + b
}

sum(100, 100)

// sum('100', '100')

// 安装flow
// yarn add flow-bin --dev
// 在文件开头写上//@flow
// 运行 yarn flow 执行检查

//  yarn flow运行不起作用
// 报错：yarn run v1.15.2
// $ D:\Git \day-day-up\EXPLORER\node_modules\.bin\flow
// Lost connection to the flow server (0 retries remaining): /Out of retries, exiting!
/*
 问题原因，路径中存在中文，没有找到flow，原来设置的是Git项目，找的是Git下的目录  
*/


// flow文件无法直接运行，需要编译去除类型限定
// 方法一：
// 通过安装flow插件，yarn add flow-remove-types --dev
// 安装完成后，运行命令 yarn flow-remove-types . -d dist
// 将所有文件进行编辑，编译后的文件存放在dist目录下


// 使用babel
// 安装yarn add @babel/core @babel/cli @babel/preset-flow --dev
// 创建.babelrc文件
// 配置内容：
// {
//     "presets": ["@babel/preset-flow"]
// }

//执行编译命令yarn babel src -d dist2

// 使用插件，flow 搜索安装
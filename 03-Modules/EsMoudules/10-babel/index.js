import {bar, foo} from "./module.js"

console.log(bar, foo)

// 安装@babel/node  @babel/core @babel/preset-env --dev
// 运行 yarn babel-node index.js 
// 此时会报错：原因是babel的核心模块并不会直接转换代码，而是通过插件
// preset-env是一个插件的集合，使用就可以解决报错
// 使用方法在.babelrc文件中
// {
//     "presets": ["@babel/preset-env"]
// }
// 本质上是使用的插件，所以也可以单独安装@babel/plugin-transform-modules-commonjs
// 使用方法在.babelrc文件中
// {
//     "plugin":["@babel/plugin-transform-modules-commonjs"]
// }
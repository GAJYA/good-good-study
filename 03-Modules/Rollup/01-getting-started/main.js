// 使用动态导入的方式
// import返回的是一个promise，then接收模块导入后的对象，对象可以使用解构方法

// import('./src/log.js').then(module => {
import('./src/log.js').then(({sayhi}) => { 
    sayhi('some message here')
})

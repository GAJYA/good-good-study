// 通过series和parallel方法来执行串行和并行任务
const { series, parallel} = require('gulp')

const task1 = done => {
    setTimeout(()=>{
        console.log('task1 is working now');
        done()
    },1000)
}
const task2 = done => {
    setTimeout(()=>{
        console.log('task2 is working now');
        done()
    },1000)
}
const task3 = done => {
    setTimeout(()=>{
        console.log('task3 is working now');
        done()
    },1000)
}

// gulp通过exports来导出命令
exports.foo = series(task1, task2, task3) //串行
exports.bar = parallel(task1, task2, task3) // 并行
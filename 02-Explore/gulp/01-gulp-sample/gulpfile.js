// gulp入口文件
// 运行在nodejs当中，可以使用commonjs规范

exports.foo = done => {
    console.log('foo task is working~');
    done() //标识任务完成
}

// 默认任务直接执行gulp任务，不需要在gulp命令后面添加任务名
exports.default = done => {
    console.log('defult task is working');
    done() 
}

// gulp4.0之前使用方法

const gulp = require('gulp')

gulp.task('bar', done => {
    console.log('bar is working now');
    done()
})


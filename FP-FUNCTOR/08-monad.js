// io函子中的value是一个函数
//  相当于惰性执行，在需要的时候再进行执行，把不纯的操作延迟，交给调用者来处理
const fp = require('lodash/fp')
const fs = require('fs')

class IO {
    static of(val){
        return new IO(function(){
            return val
        })
    }    

    constructor (fn) {
        this._val = fn
    }

    map(fn){
        // 调用new方法而不是使用of方法
        return new IO(fp.flowRight(fn, this._val))
    }
}

// 写一个读取文件并打印的组合函数


// monad函子，有静态的of方法和join方法
// 解决函子的嵌套问题


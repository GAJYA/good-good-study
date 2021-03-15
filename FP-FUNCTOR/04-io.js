// io函子中的value是一个函数
//  相当于惰性执行，在需要的时候再进行执行，把不纯的操作延迟，交给调用者来处理
const fp = require('lodash/fp')

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

let r = IO.of(process)
    .map(p => p.execPath)
console.log(r._val());

// io函子当前执行始终是一个纯的操作，map中可能有 
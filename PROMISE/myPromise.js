const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' // 失败

class MyPromise{
    constructor(executor) {
        executor(this.resolve,this.reject)
    }

    //  node 版本过低时，下面的形式会报错SyntaxError:Unexpected token = at new Script 
    // 低版本可通过把属性写在constructor中解决报错
    status = PENDING
    // 成功之后的值
    value = undefined
    // 失败后的原因
    reason = undefined
    // 成功回调
    successCallback = []
    // 失败回调
    failCallback = []
    resolve = (value) => {
        // 如果状态不是等待，阻止程序向下执行
        if(this.status !== PENDING) return
        // 将状态更改为成功
        this.status = FULFILLED
        // 保存成功之后的值
        this.value = value
        // 判断成功回调是否存在 如果存在 调用
        // this.successCallback && this.successCallback(value)

        while(this.successCallback.length) {
            this.successCallback.shift()(this.value)
        }
    }
    
    reject = (reason) => {
        if(this.status !== PENDING) return
        // 将状态更改为失败
        this.status = REJECTED
        // 保存失败后的原因
        this.reason = reason
        // 判断失败回调是否存在 如果存在 调用
        // this.failCallback && this.failCallback(reason)
        //  shift循环一次会删除一个，返回的是当前函数，直接执行
        while(this.failCallback.length) {
            this.failCallback.shift()(this.value)
        }
    }

    // 链式调用，then方法应该返回promise对象
    // then方法接收到的值是上一个
    then (successCallback, failCallback) {
        let promise2 = new MyPromise((resolve, reject) => {
            // 判断状态
            if(this.status === FULFILLED) {
               let x = successCallback(this.value)
                // 如果x的值是普通值还是promise对象
                // 如果是普通值，直接调用resolve
                // 如果是promise对象，查看promise对象返回的结果
                // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
                resolvePromise(x, resolve, reject)
            //    resolve(x)
            } else if(this.status === REJECTED) {
                failCallback(this.reason)
            } else{
                //等待
                // 将成功回调和失败回调存储起来
                this.successCallback.push(successCallback)
                this.failCallback.push(failCallback)
            }
        })
        return promise2
    }
}

function resolvePromise(x,resolve,reject) {
    if(x instanceof MyPromise) {
        // promise对象
        // x.then(value => resolve(value), reason => reject(reason))
        x.then(resolve, reject)
    } else{
        // 普通值
        resolve(x)
    }

}

module.exports = MyPromise
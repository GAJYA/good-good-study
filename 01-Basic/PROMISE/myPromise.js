const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' // 失败

class MyPromise{
    constructor(executor) {
        try {
            executor(this.resolve,this.reject)
        } catch (error) {
            this.reject(error)
        }
    }

    //  node 版本过低时，下面的形式会报错SyntaxError:Unexpected token = at new Script 
    // 低版本可通过把属性写在constructor中解决报错，或者node版本升级到12以上
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
            // this.successCallback.shift()(this.value)
            this.successCallback.shift()()
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
            this.failCallback.shift()()
        }
    }

    // 链式调用，then方法应该返回promise对象
    // then方法接收到的值是上一个
    then (successCallback, failCallback) {
        successCallback = typeof successCallback==='function'?successCallback: value => value)
        failCallback = typeof failCallback==='function'?failCallback:reason => {throw reason}
        let promise2 = new MyPromise((resolve, reject) => {
            // 判断状态
            if(this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = successCallback(this.value)
                         // 如果x的值是普通值还是promise对象
                         // 如果是普通值，直接调用resolve
                         // 如果是promise对象，查看promise对象返回的结果
                         // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
                         resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                },0)
            //    resolve(x)
            } else if(this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = failCallback(this.reason)
                         // 如果x的值是普通值还是promise对象
                         // 如果是普通值，直接调用resolve
                         // 如果是promise对象，查看promise对象返回的结果
                         // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
                         resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                },0)
            } else{
                //等待
                // 将成功回调和失败回调存储起来
                // this.successCallback.push(successCallback)
                this.successCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = successCallback(this.value)
                             // 如果x的值是普通值还是promise对象
                             // 如果是普通值，直接调用resolve
                             // 如果是promise对象，查看promise对象返回的结果
                             // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
                             resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    },0)
                })
                this.failCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = failCallback(this.reason)
                             // 如果x的值是普通值还是promise对象
                             // 如果是普通值，直接调用resolve
                             // 如果是promise对象，查看promise对象返回的结果
                             // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
                             resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    },0)
                })
            }
        })
        return promise2
    }

    catch(failCallback){
        return this.then(undefined, failCallback)
    }

    // 解决异步并发问题，按照异步代码调用顺序得到异步代码执行的结果，p1和p2,p1延迟2s,p2立即执行，放在promise.all方法中，会先执行1，再执行2
    // 接收一个数组作为参数，值可以是任意值，包括普通值和promise对象，数组顺序就是得到结果的顺序
    // 返参是一个promise对象，可以链式调用then方法
    // 有一个是失败的,all方法状态就是失败的,所有都成功,就是成功的
    // 类.方法名  静态方法 通过static声明
    static all(array){
        let result = []
        let index = 0
    
        return new MyPromise((resolve, reject) => {
            // 处理异步情况
            function addData(key, value) {
                result[key] = value
                index++
                if(index === array.length){
                    resolve(result)
                }
            }
            for (let i = 0; i < array.length; i++) {
                let element = array[i];
                if(element instanceof MyPromise) {
                    element.then(value => {
                        addData(i,value)
                    },reason => {
                        reject(reason)
                    })
                } else{
                    // 普通值
                    // 直接放到数组中
                    addData(i,element)
                }
            }
            // resolve(result)
        })
    }
    // 作用就是将给定的值转换成promise对象，
    // 返回值就是一个promise对象，对象中包裹给定的值
    // 可以接受一个promise对象，内部判断是值的类型，如果是promise对象，会直接返回当前的promise对象
    static resolve(value){
        if(value instanceof MyPromise) {
            return value
        } else{
            return new MyPromise(resolve => {resolve(value)})
        }
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if(promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if(x instanceof MyPromise) {
        // promise对象
        // x.then(value => resolve(value), reason => reject(reason))
        x.then(resolve, reject)
    } else{
        // 普通值
        resolve(x)
    }

}

let fn = (val) => {
    console.log(val);
}

function p1 () {
    return new MyPromise(function (resolve, reject) {
      setTimeout(function () {
        resolve('p1')
      }, 2000)
    })
  }
  function p2 () {
    return new MyPromise(function (resolve, reject) {
      reject('失败')
      // resolve('成功');  
    })
  }
  
  p2()
    .then(value => console.log(value))
    .catch(reason => console.log(reason))
module.exports = MyPromise
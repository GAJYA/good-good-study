/*1. Promis就是一个类，在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行
2. promise中有三种状态，pending，fulfilled，rejected
pending -> fulfilled
pending -> rejected
一旦状态确定就不可更改
3.resolve和reject函数是用来更改状态的
resolve: fulfilled
reject: rejected
4.then方法内部做的事情就是判断状态，如果状态是成功，调用成功的回调函数，如果状态是失败，调用失败的回调函数 then方法是被定义在原型对象中的
5.then成功回调有一个参数表示成功的值，then失败回调有一个参数表示失败的原因
6.同一个promise对象下面的then方法是可以被调用多次的
7.then方法是可以被链式调用的，后面的then方法的回调函数拿到的值是上一个then方法的回调函数的返回值
*/

const MyPromise = require('./myPromise')


// let promise = new Promise((resolve,reject) => {
//     // resolve('成功')
//     reject('失败')
// })
let promise = new MyPromise((resolve,reject) => {
    setTimeout(() => {
        reject('失败.......')
    }, 2000)
    // resolve('成功')
    // throw new Error('executor error')
    // reject('失败')
})


function other(params) {
    return new MyPromise((resolve, reject) =>{
        reject('other')
    })
}

function p2(params) {
    return new MyPromise((resolve, reject) =>{
        // reject('Chengg')
        setTimeout(() => {
            resolve('成功.......')
        }, 2000)
    })
}


// MyPromise.resolve(100).then(value => console.log(value))
// MyPromise.resolve(p2()).then(value => console.log(value))

new MyPromise(resolve => {
    resolve(1)
}).then(
    new MyPromise(3)
).then(console.log)
// 失败状态，看执行顺序，谁先返回
// MyPromise.all([promise,1,2,3,p2(),4,other(),5]).then(res => {
//     console.log(res);
// },err => {
//     console.log('err:',err);
// })

// promise.then().then().then(val => {
//     console.log(val);
// }, err => {
//     console.log('bbbb');
//     console.log(err);
// })
// let p1 = promise.then(val => {
//     console.log(val);
// })

// promise.then(val => {
//     console.log(val);
//     return '123'
// }, err => {
//     console.log(err);
//     throw new Error('then 失败')
//     return '456'
// }).then(val => {
//     console.log(val);
// }, err => {
//     console.log('bbbbbbb');
//     console.log(err);
//     return 2333
// }).then(val => {
//     console.log('cccccc');
//     console.log(val);
// })

// promise.then((value) => {
//     console.log(1);
//     return other()
// },(reason) => {
//     console.log(reason);
// }).then(value => {
//     console.log(value);
// })
// promise.then((value) => {
//     console.log(2);
//     console.log(value);
// },(reason) => {
//     console.log(reason);
// })
// promise.then((value) => {
//     console.log(3);
//     console.log(value);
// },(reason) => {
//     console.log(reason);
// })
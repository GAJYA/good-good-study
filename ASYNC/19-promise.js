const MyPromise = require("../PROMISE/myPromise");
const { resolve } = require("../PROMISE/myPromise");

Promise.resolve(1).then((res) => {
    console.log(res);
    return 2
})
.catch((err) => {
    return 3
})
.then((res) => {
    console.log(res);
})


Promise.resolve(1).then(2).then(
    Promise.resolve(3)
).then(console.log;)

static resolve(value) {
    if(value instanceof MyPromise){
        return value
    } else{
        return new MyPromise(resolve => resolve(value))
    }
}

then(successCallback,failCallback){
    successCallback = typeof successCallback === 'function' || (value => value)
    failCallback = typeof failCallback === 'function' || (reason => {throw reason})
    let promise2 = new MyPromise((resolve, reject) => {
        if(this.status === 'fulfilled') {
            setTimeout(() => {
                try {
                    let x = successCallback(this.value)
                    resolvePromise(promise2,x,resolve,reject) 
                } catch (error) {
                    reject(error)
                }
            },0)
        }
    })
    return promise2
}

resolvePromise (promise2,x,resolve,reject) {

    if(x === promise2) {
        return new Error('chaining circle  blablabla')
    }
    if(x instanceof MyPromise) {
        x.then(resolve, reject) 
    } else{
        resolve(x)
    }
}

let fn = (val) => {
    console.log(val);
}
/*  new MyPromise(resolve => {
        resolve(1)
    }).then(value => {
        return value
    }).then(
        new MyPromise(resolve => {
            resolve(3)
        })
    ).then(console.log(){

    })
*/
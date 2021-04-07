// Promise 基本示例

const promise = new Promise(function(resolve, reject){
    // 用于“兑现”承诺
    // resolve(100) //承诺达成
    reject(new Error('promise rejected'))
})

promise.then(function(val){
    console.log(val); //resolved
},function(err){
    console.log(err);
})
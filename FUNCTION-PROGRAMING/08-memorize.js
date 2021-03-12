// 记忆函数
const _ = require('lodash')

function getArea(r){
    console.log(r);
    return Math.PI * r *r
}

// 模拟memoize 方法实现

function memoize(f){
    let cache = {}
    return function(){
        
    }
}
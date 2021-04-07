// 微任务

console.log('start');
setTimeout(() => {
    console.log(1111);
},0)

Promise.resolve().then(() => {
    console.log(2222);
}).then(()=> {
    console.log(33333);
}).then(()=> {
    console.log(4444);
})
console.log('end');
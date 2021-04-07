// 模板常用高阶函数：map、every、some

// map
const map = (array, fn) => {
    let results = []
    for (const value of array) {
        results.push(value)
    }
    return results
}

// every
const every = (arry, fn) => {
    let results = true
    for (const value of array) {
        results = fn(value)
        if(!results){
            break
        }
    }
    return results
}

//  some
const some = (arry, fn) => {
    let results = false
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        results = fn(element)
        if(results){
            break
        }
    }
    return results
}

let array = [1,2,3,5,8]
// const arrMap = map(array,item => {
//     return item *2
// })
// console.log(arrMap)

// let r = every(array, item => item >0)
// console.log(r);


let r = some(array, item => item % 9===0)
console.log(r);

Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4);
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})
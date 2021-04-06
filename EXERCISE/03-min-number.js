var arr = [12, 34, 32, 89, 4]

// let min = arr[0]

// arr.forEach(item => {
//     min = min>item?item:min
// })


let min = arr.reduce((previousVal,currentVal)=>{
    return previousVal>currentVal?currentVal:previousVal
},arr[0])
console.log(min);

console.log(Math.min(...arr));
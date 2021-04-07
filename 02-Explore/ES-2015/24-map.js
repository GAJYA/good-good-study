// map数据结构
const obj = {}

obj[true] = 'value'
obj[1] = 'value'
obj[{a: 1}] = 'value'
// 会将toString后的结果作为键


console.log(Object.keys(obj)); //[ '1', 'true', '[object Object]' ]
//  Reflect方法
console.log(Reflect.ownKeys(obj));
// obj的toString结果是'[object Object]'

const m = new Map()
// 此处的键可以是任意的东西，不用担心转换成字符串
const tom = {name: 'tom'}
m.set(tom, 90)
m.set(2, 0)
console.log(m);
console.log(m.get(tom));

// m.has(tom)
console.log(m.has(tom));

// console.log(m.delete(tom));

// m.clear()
// 使用forEach方法遍历map
m.forEach((value, key) => {
    console.log(value,key);
})

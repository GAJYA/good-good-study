// 遍历方式

// for...of循环
// es2015遍历所有数据结构的统一方式

const arr = [1,2,3,4]

// for (const item of arr) {
//     console.log(item);
// }

// 可以通过关键字break随时终止循环
for (const item of arr) {
    console.log(item);
    if(item >= 3) {
        break
    }
}

// arr.forEach() // 无法跳出循环
// arr.some()
// arr.every()

const s = new Set(['a', 'b'])

for (const iterator of s) {
    console.log(iterator);
}


const m = new Map()

m.set('foo', '123')
m.set('boo', '345')

for (const [key,value] of m) {
    console.log(key,value);
}

const obj = {foo:123, bar:234}
// obj is not iterable
// obj不可迭代
for (const item of obj) {
    console.log(item);
}
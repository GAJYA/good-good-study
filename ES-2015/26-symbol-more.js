// Symbol补充

console.log(Symbol('foo') === Symbol('foo'));



// 
const s1 = Symbol('foo')
const s2 = Symbol('foo')
console.log(s1 === s2);
// 静态方法for
// 传入的值会转换成字符串
console.log(Symbol.for(true) === Symbol.for('true'));

// 内置的symbol常量
// console.log(Symbol.iterator);
// 为对象做迭代时候常用

const obj = {
    [Symbol.toStringTag]: 'Xobj'
}

// console.log(obj.toString());

for (const key in obj) {
    console.log(key);
}

console.log(Object.keys(obj));
console.log(JSON.stringify(obj));

// 获取到所有的symbol属性名
console.log(Object.getOwnPropertySymbols(obj));
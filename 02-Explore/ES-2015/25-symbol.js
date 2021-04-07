// 对象的属性名都是字符串，字符串可能重复，重复会产生冲突
// symbol数据类型

const cache = {}

// a.js文件
cache['foo'] = Math.random()

// b.js
cache['foo'] = '123'

// 以前会约定属性名，这种做法规避了问题但是没有解决问题
// symbol表示一个独一无二的值
// console.log(cache);

const s = Symbol()

console.log(s);
console.log(typeof s);
console.log(Symbol() === Symbol())
console.log(Symbol('foo'));
console.log(Symbol('bar'));
console.log(Symbol('foot'));

// 对象的属性名可以是两种类型，string和symbol

const obj = {}
obj[Symbol()] = 123
obj[Symbol()] = 234
obj[Symbol()] = 345
console.log(obj);

const obj2 = {
    [Symbol()]: '123',
    [Symbol()]: '234'
}
console.log(obj2);

// a.js
const name = Symbol()

const person = {
    [name]: 'jack',
    say() {
        console.log(`my name is ${this[name]}`);
    }
}

console.log(person[name]);
console.log(person[Symbol()]); //undefined

person.say()

// 最主要的作用就是给对象添加一个独一无二的属性

// 共7种数据类型，除了obj外
// 8可能会新增一个bigint类型来存储更长的数字
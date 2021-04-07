// 可迭代接口
// for...of遍历普通对象会报错 obj is not iterable

// es中能够表示有结构的数据类型越来越多
// 为了提供一种统一的遍历方式
// es2015提供了iterable接口
// 接口可以理解为一种规则标准
// iterable接口实现了哪些东西？？？
// 特点
/*1.必须要实现iterator的方法
2.这个方法要返回一个带有next方法的对象
3.不断调用next方法就可以实现对内部所有数据的遍历
*/

const s = new Set(['foo', 'bar'])

const iterator = s[Symbol.iterator]()

// console.log(iterator);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
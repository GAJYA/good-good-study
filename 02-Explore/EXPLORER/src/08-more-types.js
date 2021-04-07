// @flow

// 特殊类型

// 字面量类型
// 指定的值
const a: 'foo' = 'foo'

// 联合类型/或类型
const type: 'success' | 'warning' | 'danger' = 'success'

const b: string | number = '214' // 214

type StringOrNumber = string | Number

const c: StringOrNumber = '211' //211

// ------------------------
// maybe类型，在基础类型之上提供了null和undefined，意思为number或null或undefined
const gender: ?number = null
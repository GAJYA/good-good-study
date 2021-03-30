// @flow

const obj1: { foo: string, bar: number} = {
    foo: 's',
    bar: 1
}

// foo属性可有可无，有的话必须为string类型
const obj2 : { foo?: String, bar: number} = {
    bar: 100
}

// 当前对象允许添加任意对象的键，键值均必须为string
const obj3: {[string]: string} = {}
 obj3.key1 = 'value1'
//  obj3.key2 = 100
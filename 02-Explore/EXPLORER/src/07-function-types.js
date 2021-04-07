// @flow

// 通过函数签名的形式来限定入参类型
function foo(callback:(string, number)=> void) {
    callback('string', 100)
}
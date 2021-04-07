// @flow

// 可以是任意类型,mixed是一个具体的类型，如果没有明确类型，不可以直接当做某个类型去使用，可以通过在运行阶段通过typeof进行类型判断，然后再使用
function passMixed(value: mixed) {
    if(typeof value === 'string'){
        value.substr(1)
    }
    if(typeof value === 'number') {
        value * value
    }
}

// 任意类型的参数都不会有问题
// any是不安全的，any存在主要是为了兼容以前的旧的代码
function passAny(value: any) {
    value.substr(1)

    value * value
}

passAny('string')

// any是弱类型
// mixed是强类型
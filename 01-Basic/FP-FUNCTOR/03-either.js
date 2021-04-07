// Either 函子
// Either两者中的任何一个，类似于if...else...的处理
// 异常会让函数变的不纯，either函子可以用来做异常处理

// 出现问题后either函子可以给出提示信息
class Left {
    static of(val){
        return new Left(val)
    }
    constructor (val) {
        this._val = val
    }
    map(fn) {
        return this
    }
}

class Right {
    static of(val){
        return new Right(val)
    }
    constructor (val) {
        this._val = val
    }
    map(fn) {
        return Right.of(fn(this._val))
    }
}

// let r1 = Right.of(12).map(x => x + 2)

// let r2 = Left.of(12).map(x => x + 2)

// console.log(r1);
// console.log(r2);

function parseJSON(str){
    try{
        return Right.of(JSON.parse(str))
    } catch(e){
        return Left.of({error: e.message})
    }
}

// let r = parseJSON('{name:zs}')
// console.log(r);

let r = parseJSON('{"name":"zs"}')
    .map(x => x.name.toUpperCase())
console.log(r);
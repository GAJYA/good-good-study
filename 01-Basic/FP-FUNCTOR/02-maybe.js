// MayBe 函子

class MayBe{
    static of(val) {
        return new MayBe(val)
    }

    constructor (val){
        this._val = val
    }
//  处理空的情况
    map(fn){
        return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._val))
    }

    isNothing () {
        return this._val === null || this._val === undefined
    }


}

// let r = MayBe.of('Hello World')
    // .map(x => x.toUpperCase())
    
// let r = MayBe.of(null)
//     .map(x => x.toUpperCase())

// 结果会出现null，但是无法确定是哪一步出现的，这个问题可以通过either来解决
let r = MayBe.of('hello world')
    .map(x => x.toUpperCase())
    .map(x => null)
    .map(x =>x.split(' '))

console.log(r);
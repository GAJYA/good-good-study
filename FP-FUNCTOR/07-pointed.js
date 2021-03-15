class Container {
    static of (val) {
        return new Container(val)
    }
    constructor (val) {
        this._val = val
    }

    map(fn){
        return  fn(this._val)
    }
}

let r = Container.of(2).map(x =>x + 1)
console.log(r);
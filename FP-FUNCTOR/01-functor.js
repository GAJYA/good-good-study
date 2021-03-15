// Functor 函子
// class Container{
//     constructor (val) {
//         this._val = val // 下划线表示私有值，外部无法访问
//     }
//     map(fn) {
//         return new Container(fn(this._val))
//     }
// }

// // map方法返回的不是新的值，返回的是一个新的函子对象
// let r = new Container(5)
//     .map(x => x + 1)
//     .map(x => x * x)

// console.log(r);

// 封装一个new
// 函数式编程的思想
class Container{
    // 静态方法，直接通过类名来调用
    static of(val){
        return new Container(val)
    }
    constructor (val) {
        this._val = val // 下划线表示私有值，外部无法访问
    }
    map(fn) {
        return Container.of(fn(this._val))
    }
}

// 函子的值一直在盒子里,对值进行处理的话，通过map方法进行处理

// let r = Container.of(5)
//     .map(x => x+1)
//     .map(x => x*x)
    
// console.log(r);


// 总结


// 演示null undefined的问题
let r = Container.of(null)
    .map(x => x.toUpperCase()) // 报错null没有uppercase方法，这就是函子的副作用，函子需要是纯函数，输入的内容和输出的结果一一对应
    
console.log(r);
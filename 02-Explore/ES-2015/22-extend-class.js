// 类的继承 EXTEND
// 
class Person {
    // 当前类的构造函数
    constructor(name) {
        this.name = name
    }
    say() {
        console.log(`hi,my name is ${this.name}`);
    }

    // 创建person类型的 实例
    // 可以直接调用生成实例，不需要new
    // 挂载在类型上面的，this不会指向某个实例对象，而是当前的类型
    static create (name) {
        return new Person(name)
    }
}

class Student extends Person {
    constructor(name, num) {
        super(name)
        this.num = num
    }
    hello () {
        super.say()
        console.log(`my school number is ${this.num}`);
    }
}

const tom = new Student('tom', 33)
tom.hello()
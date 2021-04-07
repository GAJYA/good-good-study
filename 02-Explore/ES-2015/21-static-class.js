// 实例方法
// 静态方法
// es2015新添加static作为静态方法关键词
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


const tom = Person.create('tom')
tom.say()
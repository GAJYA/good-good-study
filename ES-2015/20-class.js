// class类 关键词

function Person(name) {
    this.name = name
}

Person.prototype.say = function (name) {
    console.log(`hi,my name is ${this.name}`);
}

class Person2 {
    // 当前类的构造函数
    constructor(name) {
        this.name = name
    }
    say() {
        console.log(`hi,my name is ${this.name}`);
    }
}

const tom = new Person2('TOM')
tom.say()

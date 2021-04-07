// 将多个源对象中的属性复制到一个目标对象中

// Object.assign方法

const source1 =  {
    a: 123,
    b: 123
}
const source2 =  {
    a: 789,
    b: 789
}

const target = {
    a: 456,
    c: 456
}

const res = Object.assign(target, source1, source2)

console.log(target);
// 用后面对象的属性去覆盖第一个对象
// assign方法的返回值就是第一个对象
// 常用复制一个对象
console.log(res === target);

function func(obj) {
    obj.name = 'func obj'
    console.log(obj);
    const funcObj = Object.assign({}, obj)
}


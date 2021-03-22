// 统一的对象操作api
// 一个静态类，不可以通过new来进行构建一个实例对象，只能调用静态方法，类似于Math
// reflect成员方法就算proxy处理对象的默认实现

const obj = {
    name: 'tom',
    age: 19
}

const proxy = new Proxy(obj, {
    get(target, property) {
        console.log('watch logic~');
        return Reflect.get(target, property)
    }
})

// console.log(proxy.name);
// 意义是什么：统一提供一套用于操作对象的API

// console.log('name' in obj);
console.log(Reflect.has(obj, 'name'));
console.log(Reflect.deleteProperty(obj, 'name'));
console.log(Reflect.ownKeys(obj));
// Reflect的十三个方法

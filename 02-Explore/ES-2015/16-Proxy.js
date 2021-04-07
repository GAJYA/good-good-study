// Object.defineProperty
// vue3.0以前使用的这个方法实现的数据绑定
// proxy专门为对象提供的代理方法
// 相当于一个门卫，不管是拿还是取都需要经过代理
// Proxy对象

const person = {
    name:'jack',
    age: 18
}

const personProxy = new Proxy(person, {
    get(target,property) {
        return property in target?target[property]: 'default'
        console.log(target, property);
        // return 100
    },
    set(target, property, value) {
        if(property === 'age') {
            if(!Number.isInteger(value)) {
                throw new TypeError(`${value} is not a number`)
            }
        }
        target[property] = value
    }

})
personProxy.name = 'tom'

console.log(personProxy.name);
console.log(personProxy.xxx); // 取没有的属性会返回默认return的值
personProxy.age = 13
// personProxy.age = 'string'

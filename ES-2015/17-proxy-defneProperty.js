// defineProperty只能监听到get或set方法,即读写
// proxy可以监听到对象中方法的调用等，delete操作等

//  对比

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
    },
    has(target, property) {
        console.log('in', property);
        return Boolean(target[property])
    },
    deleteProperty (target, property) {
        console.log('delete', property);
        delete target[property]
    },
    
})

// delete personProxy.age
// console.log('name' in person);

// 对数组对象的监视
// defineProperty会重写数组的方法

const list = []

const listProxy = new Proxy(list,{
    set(target, property, value) {
        console.log('set', property, value);
        target[property] = value
        return true //表示设置成功
    }
})

listProxy.push(100)
listProxy.push(100)

// proxy以非侵入的方式监管了整个对象的东西，一个已经定义好的对象，不需要做什么操作就可监听到
// object.defineProperty需要对已经存在的对象做许多操作
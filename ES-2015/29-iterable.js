// 实现可迭代接口 Iterable

const obj = {
    store: [1,2,3],
    // iterable可迭代接口
    [Symbol.iterator]: function () {
        let index = 0
        // next中的this并不是指向当前对象的，所以定义一个self
        const self = this
        // iterator 迭代器接口
        return {
            next: function () {
                // iterationResult 迭代结果
                const res = {
                    value: self.store[index], //当前被迭代到的数据
                    done: index >= self.store.length  // 表示当前迭代是否结束
                }
                index ++
                return res
            }
        }
    }
}

for (const item of obj) {
    console.log(item);
}
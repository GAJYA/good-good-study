class Observer {
    // 接收参数data
    constructor (options) {
        // 初始调用
        this.walk(options)
    }

    // 遍历所有data属性
    walk (data) {
        // 判断是否有值且是对象
        if(!data || typeof data !== 'object') return
        Object.keys(data).forEach(key => {
            let value = data[key]
            this.defineReactive(data, key, value)
        })
    }
    // 设置响应式数据
    defineReactive (data, key, value) {
        const that = this
        let dep = new Dep()
        // 当属性值为对象时候，需要递归调用
        this.walk(value)
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get () {
                return value
            },
            set (newValue) {
                if(value === newValue) return
                value = newValue
                // 新设置的newval为对象时候，需要重新调用walk
                that.walk(newValue)
                / 发送通知
        dep.notify()
            }
        })
    }
}
class Observer {
    // 接收参数data
    constructor (options) {
        this.$data = options
    }

    // 遍历所有data属性
    walk (data) {
        // 判断是否有值且是对象
        if(!data || typeof(data) !== 'object') return
        Object.keys(data).forEach(key => {
            let value = data[key]
            this.defineReactive(data, key, value)
        })
    }
    // 设置响应式数据
    defineReactive (data, key, value) {
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get () {
                return data[key]
            },
            set() {
                
            }
        })
    }
}
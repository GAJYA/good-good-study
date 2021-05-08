class Vue {
    // 初始化传入的参数
    constructor (options) {
        this.$options = options
        this.$el = typeof(options.el) === 'string' ? document.querySelector(options.el) : options.el
        this.$data = options.data || {}
        // 把data中的属性转换成getter/setter注入到vue实例中方便使用
        this._proxyData(this.$data)
        // 调用Observer对象，给data里的属性设置getter和setter
        new
    }

    _proxyData (data) {
        // 遍历data所有的属性
        Object.keys(data).forEach(key => {
            // 设置getter和setter
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get () {
                    return data[key]
                },
                set (newVal) {
                    if(data[key] === newVal) return
                    // 重新设置值
                    data[key] = newVal
                }
            })
        })
    }
}
class Vue {
    // 初始化传入的参数
    constructor (options) {
        this.$options = options
        this.$el = typeof(options.$el) === 'string' ? document.querySelector(options.$el) : options.$el
        this.$data = options.$data || {}
        // 把data中的属性转换成getter/setter注入到vue实例中方便使用
        this._proxyData(thi)
    }

    _proxyData () {

    }
}
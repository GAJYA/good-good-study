class Vue {
    // 初始化传入的参数
    constructor (options) {
        this.$options = options
        this.$el = typeof(options.$el) === 'string' ? document.querySelector(options.$el) : options.$el
        this.$data = options.$data


    }

    _proxyData () {

    }
}
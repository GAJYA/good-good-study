class Observer {
    // 接收参数data
    constructor (options) {
        this.$data = options
    }

    // 遍历所有data属性
    walk (data) {
        // 判断是否有值且是对象

        Object.keys(data).forEach(key => {

        })
    }
    // 设置响应式数据
    defineReactive () {

    }
}
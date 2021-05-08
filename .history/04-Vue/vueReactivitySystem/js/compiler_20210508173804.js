class Compiler {
    constructor (options) {
        this.vm = options
        // 初始化调用compile方法
        this.compile(this.vm.$el)
    }

    compile (el) {
        // 获取el下所有的子节点 childNodes
        const childNodes = el.childNodes
        // 
    }
}
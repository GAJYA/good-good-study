class Compiler {
    constructor (options) {
        this.vm = options
        // 初始化调用compile方法
        this.compile(this.vm.$el)
    }
    // 编译模板，处理文字节点和元素节点
    compile (el) {
        // 获取el下所有的子节点 childNodes
        const childNodes = el.childNodes
        // 遍历子节点，根据当前节点类型，使用对应的编译方法处理

    }

    // 编译元素节点，处理指令
    compileElements (node) {

    }

    // 编译文本节点，处理插值表达式
    compileText (node) {

    }

    // 判断是否是指令，判断是否yi
}
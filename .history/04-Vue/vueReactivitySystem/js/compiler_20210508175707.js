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
        Array.from(childNodes).forEach(node => {
            // 处理元素节点
            if(this.isElementNode(node)) {
                this.compileElements(node)
            } else if (this.isTextNode(node)) {
                // 处理文字节点
                this.compileText(node)
            }

            // 判断子节点是否有childNodes，递归调用compile
            if(node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        })

    }

    // 编译元素节点，处理指令
    compileElements (node) {
        console.log(node);
    }

    // 编译文本节点，处理插值表达式
    compileText (node) {
        
    }

    // 判断是否是指令，判断是否以v-开头
    isDerective (attrName) {
        return attrName.startsWith('v-')
    }

    // 判断节点是元素节点
    isElementNode (node) {
        return node.nodeType === 1
    }

    // 判断节点是文本节点
    isTextNode (node) {
        return node.nodeType === 3
    }
}
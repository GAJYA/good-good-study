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
        // console.dir(node);
        // 获取node的属性
        Array.from(node.attributes).forEach(attr => {
            // 判断是否是指令
            if(this.isDerective(attr.name)){
                let attrName = attr.name.substr(2)
                let key = attr.value
                // 调用对应指令的处理方法
                this.update(node, key, attrName)
            }
        })
    }

    update (node, key, attrName) {
        // 调用对应的方法
        // this[attrName + 'Update'] && this[attrName + 'Update'](node, key)
        const compileFunc = this[attrName + 'Update']
        // this指向问题
        compileFunc && compileFunc.call(this, node, key)
    }

    textUpdate (node, key) {
        node.textContent = this.vm[key]
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue
        })
    }

    htmlUpdate (node, key) {
        // console.dir(node);
        node.innerHTML = this.vm[key]
        new Watcher(this.vm, key, (newValue) => {
            node.innerHTML = newValue
        })
    }

    onUpdate (node, key) {
        on:click
        node.textContent = this.vm[key]
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue
        })
    }

    modelUpdate (node, key) {
        // input框的值通过value获取
        node.value = this.vm[key]
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue
        })
        // 双向绑定
        node.addEventListener('input', () => {
            this.vm[key] = node.value
        })
    }

    // 编译文本节点，处理插值表达式
    compileText (node) {
        // 设置正则表达式
        const rule = new RegExp(/\{\{(.+s?)\}\}/)
        // 匹配上正则的情况下表明是插值表达式语法
        if(rule.test(node.textContent)){
            // 去掉前后空格
            const key = RegExp.$1.trim()
            // 把node的具体内容替换成具体的值
            node.textContent = this.vm[key]
            // 创建watcher对象，当数据改变更新视图
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }
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
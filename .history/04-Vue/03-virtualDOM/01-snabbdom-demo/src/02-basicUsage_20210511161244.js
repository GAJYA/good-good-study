
// 此处的路径不对，具体观察snabbdom中的init放置路径
// import { init } from 'snabbdom/init'
import { init } from 'snabbdom/build/package/init.js'
import { h } from 'snabbdom/build/package/h.js'

// 数组里传模块
const patch = init([])

// param1: 标签+选择器
// param2: 如果是字符串就是标签中的文本内容，如果是数组的形式，可以调用h函数实现，创建子元素
let vnode = h('div#container', [
    h('h1', 'Hello Snabbdom'), 
    h('p','这是一个p标签')
])
let app = document.querySelector('#app')

// patch
// param1:可以是  旧的vnode 或者 DOM元素
// param2: 新的vnode
// return 新的vnode
let oldVnode = patch(app, vnode)

setTimeout(() => {
    vnode = h('div#container.two.classes', [
        h('h1', 'Hello World'), 
        h('p', 'Hello P')
    ])
    patch(oldVnode, vnode)

    // 清除div内容
    // 生成空的注释节点  h('!')
    vnode = h('!')
}, 2000)


// 使用h函数创建子元素
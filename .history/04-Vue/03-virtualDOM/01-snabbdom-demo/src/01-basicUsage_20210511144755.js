
// 此处的路径不对，具体观察snabbdom中的init放置路径
// import { init } from 'snabbdom/init'
import { init } from 'snabbdom/build/package/init.js'
import { h } from 'snabbdom/build/package/h.js'

const patch = init([])

// param1: 标签+选择器
// param2: 如果是字符串就是标签中的文本内容

let vnode = h('div#container.cls', 'hello world')
let app = document.querySelector('#app')

// patch
// param


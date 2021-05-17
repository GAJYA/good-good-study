/*
 *           佛曰:  
 *                   写字楼里写字间，写字间里程序员；  
 *                   程序人员写程序，又拿程序换酒钱。  
 *                   酒醒只在网上坐，酒醉还来网下眠；  
 *                   酒醉酒醒日复日，网上网下年复年。  
 *                   但愿老死电脑间，不愿鞠躬老板前；  
 *                   奔驰宝马贵者趣，公交自行程序员。  
 *                   别人笑我忒疯癫，我笑自己命太贱；  
 *                   不见满街漂亮妹，哪个归得程序员？
 * 
 * @Description: 
 * @Author: lunarJan
 * @Date: 2021-05-11 16:16:55
 * @LastEditors: lunarJan
 * @LastEditTime: 2021-05-12 11:38:41
 */



// init 注册模块
// h   设置
// patch 

import { init } from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'

// 导入模块
import { styleModule } from 'snabbdom/build/package/modules/style'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'
// 注册模块
const patch = init([styleModule, eventListenersModule])

// 使用h()函数的第二个参数传入模块中使用的数据（对象）
let vnode = h('div', [
    h('h1', {style:{ backgroundColor:'pink' }},[
        h('span', 'Hello World')
    ]),
    h('p', {on: {click: eventHandler}}, 'click me')
])
function eventHandler () {
    console.log('click handler');
}
let app = document.querySelector('#app')

patch(app, vnode)

// init 注册模块
// h   设置
// patch 

import { init } from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'

// 导入模块
import { styleModule } from 'snabbdom/build/package/modules/style'
import { eventListeners } from 'snabbdom/build/package/modules/style'
// 注册模块
// 使用h()函数的第二个参数传入模块中使用的数据（对象）
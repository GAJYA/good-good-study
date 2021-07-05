// 客户端entry只需要创建应用程序，并且将其挂载到DOM中
import { createApp } from './app'

// 客户端特定引导逻辑……

const { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
  app.$mount('#app')
})

// 这里假定 App.vue 模板中根元素具有 `id="app"`
// app.$mount('#app')

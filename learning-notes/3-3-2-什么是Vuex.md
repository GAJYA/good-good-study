什么是Vuex

vuex是专门为vue.js设计的状态管理库





什么情况下使用vuex

非必要的情况下不要使用vuex

大型的单页应用程序

* 多个视图依赖同一状态
* 来自不同视图的行为影响同一状态

vuex核心概念

* store
* state  状态
* getter  vuex中的计算属性，状态改变才会重新计算
* mutation  状态的改变通过mutation实现
* action  异步的mutation
* module  模块

vux基本结构


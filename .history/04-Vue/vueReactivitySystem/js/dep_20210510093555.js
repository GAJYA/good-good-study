class Dep {
    // 观察者模式
    constructor () {
        this.subs = []   
    }

    // 添加watcher,收集依赖
    addSubs (sub) {
        // watcher中有一个update的方法，用于更新shi
        if(sub && sub.update){
            this.subs.push(sub)
        }
    }

    // 下发通知
    notify () {
        this.subs.forEach(sub => {
            sub.update()
        })
    }

}
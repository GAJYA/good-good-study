class Dev {
    // 观察者模式
    constructor () {
        this.subs = []   
    }

    // 添加watcher,收集依赖
    addSubs (sub) {
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
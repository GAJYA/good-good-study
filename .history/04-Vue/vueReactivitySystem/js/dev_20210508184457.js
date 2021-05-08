class Dev {
    // 观察者模式
    constructor () {
        this.subs = []   
    }

    // 添加watcher
    addSubs (sub) {
        if(sub && sub.update) return
        this.subs.push(watcher)
    }

    // 下发通知
    notify () {
        this.subs.forEach(sub => {
            sub.update()
        })
    }

}
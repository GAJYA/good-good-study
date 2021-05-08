class Dev {
    // 观察者模式
    constructor () {
        this.subs = []   
    }

    // 添加watcher
    addSubs (watcher) {
        this.
    }

    // 下发通知
    notify () {
        this.subs.forEach(sub => {
            sub.update()
        })
    }

}
class Dev {
    // 观察者模式
    constructor () {
        this.subs = []   
    }

    // 添加watcher
    addSubs (watcher) {
        if(this.subs.includes(watcher)) return

    }

    // 下发通知
    notify () {
        this.subs.forEach(sub => {
            sub.update()
        })
    }

}
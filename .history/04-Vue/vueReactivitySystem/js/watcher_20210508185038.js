class Watcher {
    constructor (vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb
        Dep.target
        this.oldValue = vm[key]

    }
    // 当数据发生变化时候更新视图
    update () {
        let newValue = this.vm[key]
        if(oldValue === newValue) return
        this.cb(newValue)
    }
    
}
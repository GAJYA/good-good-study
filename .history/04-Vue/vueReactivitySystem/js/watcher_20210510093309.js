class Watcher {
    constructor (vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb
        // 给Dep的静态属性target绑定watcher
        Dep.target = this
        // vm[key]会触发getter
        this.oldValue = vm[key]
        Dep.target = null
    }
    // 当数据发生变化时候更新视图
    update () {
        let newValue = this.vm[this.key]
        if(this.oldValue === newValue) return
        this.cb(newValue)
    }
    
}
class Watcher {
    constructor (vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb
        // 给Dep的静态属性target绑定watcher
        Dep.target = this
        // vm[key]会触发defineReactive中的getter
        // getter中做了收集依赖的处理
        // Dep.target && dep.addSub(Dep.target)
        // 妙啊
        this.oldValue = vm[key]
        // 触发依赖收集后，把t
        Dep.target = null
    }
    // 当数据发生变化时候更新视图
    update () {
        let newValue = this.vm[this.key]
        if(this.oldValue === newValue) return
        this.cb(newValue)
    }
    
}

import Compiler from './Compiler'
import observe from './observe'
import Watcher from './Watcher'
class Vue {
    constructor(options){
        // 把参数options存为$options
        this.$options = options || {}
        // 数据
        this._data = options.data || undefined
        new observe(this._data)
        // 默认数据变为响应式的，
        this._initData()
        // 调用默认的watch
        this._initWatch()
        // 模板编译
        new Compiler(options.el,this)
    }
    _initData(){
        var self = this
        Object.keys(self._data).forEach(key=>{
            Object.defineProperty(self,key,{
                get(){
                    return self._data[key]
                },
                set(newVal){
                    self._data[key] = newVal
                }
            })
        })
    }
    _initWatch(){
        var self = this
        var watch = this.$options.watch
        Object.keys(watch).forEach(key=>{
            new Watcher(self,key,watch[key])
        })
    }
}

window.Vue = Vue
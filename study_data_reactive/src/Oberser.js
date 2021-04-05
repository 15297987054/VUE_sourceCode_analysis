import { def } from './utils'
import defineReactive from './defineReactive'
import {arrayMethods} from './array'
import observe from './observe'
import Dep from './Dep'
// 将一个正常的object转换为每个层级的属性都是响应式（可以被侦测）的object
export default class Observer {
    constructor(value){
        // 每一个Observer的实例身上都有一个dep
        this.dep = new Dep()
        // console.log('我是observer构造器',value);
        // 给实例（this，一定要注意，构造函数中的this不是表示类本身，而是表示实例）
        // 添加了一个__ob__属性，值是这次new的实例
        def(value,'__ob__',this,false)
        // 检查它是数组还是对象
        if(Array.isArray(value)){
            // 如果是数组，要强行将这个数组的原型指向arrayMethods
            Object.setPrototypeOf(value,arrayMethods)
            // 让数组变得observe
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }
    // 遍历
    walk(value){
        for(let k in value){
            defineReactive(value,k)
        }
    }
    // 数组的特殊遍历
    observeArray(arr){
        for(let i=0,l = arr.length;i<l;i++){
            // 逐项进行observe
            observe(arr[i])
        }
    }
}
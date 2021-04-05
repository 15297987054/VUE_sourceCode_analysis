import h from './mySnabbdom/h'
import patch from './mySnabbdom/patch'

const myVonode1 = h('ul',{},[
    h('li',{key:'A'},'A'),
    h('li',{key:'B'},'B'),
    h('li',{key:'C'},'C'),
    h('li',{key:'D'},'D'),
    h('li',{key:'E'},'E'),
])

// 得到盒子和按钮
const container = document.getElementById('container')
const btn = document.getElementById('btn')
// 第一次上树
patch(container,myVonode1)
// 新的节点
const myVonde2 = h('ul',{},[
    h('li',{key:'Q'},'Q'),
    h('li',{key:'C'},'AAAAA'),
    h('li',{key:'B'},'B'),
    h('li',{key:'D'},'D'),
    h('li',{key:'E'},'E'),
    
    h('li',{key:'A'},'A'),
])


btn.onclick = function(){
    patch(myVonode1,myVonde2)
}
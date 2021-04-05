import createElement from './createElement'
import updateChildren from './updateChildren'
export default function patchVnode(oldVnode,newVnode){
    // 判断新的vnode有没有text属性
    if(oldVnode === newVnode) return
    // 判断新vnode有没有text属性
    if(newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length ==0)){
        if(newVnode.text != oldVnode.text){
            // 如果新虚拟节点中的text和老的虚拟节点中的text不同，那么直接让新的text写入老的elm中即可
            // 如果老的elm中是children，慢也会立即消失掉
            oldVnode.elm.innerText = newVnode.text
        }
    } else{
        // 新node没有text属性
        // 判断老的有没有children
        if(oldVnode.children != undefined && oldVnode.children.length>0){
            // 老的有children，此时就是最复杂的情况，新老都有children
            updateChildren(oldVnode.elm,oldVnode.children,newVnode.children)
        }else{
            // 老的没有children，新的有children
            // 清空老的节点的内容
            oldVnode.elm.innerText = ''
            // 遍历新的vnode的子节点，创建dom，上树
            for(let i=0;i<newVnode.children.length;i++){
                let dom = createElement(newVnode.children[i])
                oldVnode.elm.appendChild(dom)
            }
        }
    }
}
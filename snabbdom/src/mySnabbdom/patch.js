import vnode from './vnode'
import createElement from './createElement'
import patchVnode from './patchVnode'
export default function patch(oldVnode, newVnode) {
    // 判断传入的第一个参数，是dom系欸但还是虚拟节点
    if (oldVnode.sel == '' || oldVnode.sel == undefined) {
        // 传入的第一个参数是dom节点，此时要包装为虚拟节点
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    }

    // 判断oldVnode 和newVnode是不是同一个节点
    if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
        console.log('是同一个节点');
        patchVnode(oldVnode,newVnode,)
    } else {
        console.log('不是同一个，暴力删除旧的，插入新的');
        let newVnodeElm = createElement(newVnode)
        // 插入到老节点之前
        if(oldVnode.elm.parentNode && newVnodeElm){
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
        }
        // 删除老节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
}
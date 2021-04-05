// 真正创建节点,将vnode创建为dom，是孤儿节点，不进行插入
export default function createElement(vnode){
    // 创建一个节点，现在还是孤儿节点
    let domNode = document.createElement(vnode.sel)
    // 有子节点还是有文本？？
    if(vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)){
        // 内部是文本
        domNode.innerText = vnode.text
    } else if(Array.isArray(vnode.children) && vnode.children.length>0){
        // 它内部是子节点，就要递归创建节点
        for(let i=0;i<vnode.children.length;i++){
            // 得到当前的children
            let ch = vnode.children[i]
            // 创建出他的dom，一旦调用createElement意味着：创建出dom了，
            // 并且他的elm属性指向了创建出的dom，但是还没有上树，是一个孤儿节点
            let chDom = createElement(ch)
            // 上树
            domNode.appendChild(chDom)
        }
    }
    // 补充elm属性
    vnode.elm  = domNode

    // 返回elm,elm属性是一个纯dom属性
    return vnode.elm
}
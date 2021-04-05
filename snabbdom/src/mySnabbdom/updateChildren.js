import patchVnode from './patchVnode'
import createElement from './createElement'
// 判断是否是同一个虚拟节点
function checkSameVnode(a, b) {
    return a.sel == b.sel && a.key == b.key
}

export default function updateChildren(parentElm, oldCh, newCh) {
    console.log('我是updateChildren', oldCh, newCh);

    // 旧前
    let oldStartIdx = 0;
    // 新前
    let newStartIdx = 0
    // 旧后
    let oldEndIdx = oldCh.length - 1
    // 新后
    let newEndIdx = newCh.length - 1
    // 旧前节点
    let oldStartVnode = oldCh[0]
    // 旧后节点
    let oldEndVnode = oldCh[oldEndIdx]
    // 新前节点
    let newStartVnode = newCh[0]
    // 新后节点
    let newEndVnode = newCh[newEndIdx]

    let keyMap = null

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        // 首先不是判断1，2，3，4命中，而是要略过已经加undefined标记的东西
        if (oldStartVnode == null || oldCh[oldStartIdx] == undefined) {
            oldStartVnode = oldCh[++oldStartIdx]
        } else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
            oldEndVnode = oldCh[--oldEndIdx]
        } else if (newStartVnode == null || newCh[newStartIdx] == undefined) {
            newStartVnode = newCh[++newStartIdx]
        } else if (newEndVnode == null || newCh[newEndIdx] == undefined) {
            newEndVnode = newCh[--newEndIdx]
        } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
            // 新前和旧前
            console.log('新前和旧前命中');
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
            // 新后和旧后
            console.log('新后和旧后命中');
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
            // 新后与旧前
            console.log('新后与旧前命中');
            patchVnode(oldStartVnode, newEndVnode)
            // 当新后与旧前命中时，要移动节点，移动新前指向的这个节点到老节点的旧后的后面
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
            // 新前与旧后
            console.log('新前与旧后命中');
            patchVnode(oldEndVnode, newStartVnode)
            // 当新前与旧后命中时，要移动节点，移动新前指向的这个节点到老节点的旧前的前面
            parentElm.insertBefore(oldSEndVnode.elm, oldStartVnode.elm)
            // 如何移动节点？只要插入一个已经在dom树上的节点，它就会被移动
            oldEndVnode = oldCh[--oldStartIdx]
            newStartVnode = newCh[++newEndIdx]
        } else {
            // 四种都没有命中
            // 制作keyMap一个映射对象，这样就不用每次都遍历老对象了
            if (!keyMap) {
                keyMap = {}
                // 从oldStartIdx开始，到oldEndIdx结束，创建keyMap映射对象
                for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                    const key = oldCh[i].key
                    if (key != undefined) {
                        keyMap[key] = i
                    }
                }
            }
            console.log(keyMap, 'map');
            // 寻找当前这项（newStartIdx) 这项keyMap中的映射的位置序号
            const idxInOld = keyMap[newStartVnode.key]
            console.log(idxInOld);

            if (idxInOld == undefined) {
                // 判断，如果idxInold是undefined表示它是全新的项
                // 被加入的项（就是被newVnode项） 现不是真正的虚拟节点
                parentElm.insertBefore(createElement(newStartVnode),oldStartVnode.elm)
            } else {
                // 如果不是undefined不是全新的，需要移动
                const eleToMove = oldCh[idxInOld]
                patchVnode(eleToMove, newStartVnode)
                // 把这项改为undefined，表示已经处理完
                oldCh[idxInOld] = undefined
                // 移动，调用insertBefore
                parentElm.insertBefore(eleToMove.elm, oldStartVnode.elm)
            }
            // 指针下移，只移动新的头
            newStartVnode = newCh[++newStartIdx]
        }
    }
    // 继续看有没有剩余的节点,循环结束了，start还是比old小
    if (newStartIdx <= newEndIdx) {
        console.log('还有剩余节点需处理');
        // 要把所有剩余的节点，都要插入到oldStartidx之前
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            // insertBefore可以自动识别null，如果时null，会自动排到队尾去，和appendChild是一致的
            // newCh[i]现在还没有称为真正dom，所以需要调用creatElement
            parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm)
        }
    } else if (oldStartIdx <= oldEndIdx) {
        console.log('old还有剩余节点没有处理');
        // 批量删除oldStart和oldEnd指针之间的项
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            if (oldCh[i]) {
                parentElm.removeChild(oldCh[i].elm)
            }
        }
    }
}
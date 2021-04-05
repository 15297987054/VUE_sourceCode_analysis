import vnode from './vnode'

// 编写一个低配版本的h函数，这个函数必须接收3个参数，缺一不可
// 相当于它的重载功能较弱
// 也就是说，调用的时候形态必须时以下三种之一
// 形态1  h('div',{},'文字')
// 形态2  h('div',{},[])
// 形态3  h('div',{},h())
export default function (sel, data, c) {
    // 检查参数的个数
    if (arguments.length != 3) {
        throw new Error('h函数必须传入三个参数~')
    }
    // 检查c的参数类型
    if (typeof c === 'string' || typeof c === 'number') {
        // 说明现在调用h函数时形态1
        return vnode(sel, data, undefined, c, undefined)
    } else if (Array.isArray(c)) {
        // 说明现在调用h函数时形态2
        let children = []
        for(let i=0;i<c.length;i++){
            // 检查c[i]必须是一个对象
            if(!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))){
                throw new Error('传入的数组参数种有的项不是h函数')
            // 这里不用执行c[i],因为在测试语句中已经有了执行
            // 此时只需要收集即可
            }
            children.push(c[i])
        }
        // 循环结束，就说明children收集完了
        return vnode(sel,data,children,undefined,undefined)
    } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
        // 说明现在调用h函数时形态3
        // 即，传入的c是唯一的children
        let children = [c]
        return vnode(sel,data,children,undefined,undefined)
    } else {
        throw new Error('传入的第三个参数类型不对')
    }

}
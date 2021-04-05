import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { h } from 'snabbdom/h' // helper function for creating vnodes

// 创建出patch函数
const patch = init([classModule,propsModule,styleModule,eventListenersModule])

// 创建虚拟节点
const myVnode = h('a',{props:{href:'http://www.atguigu.com',target:'_blank'}},'尚硅谷')

const myVnode2 = h('div',{class:{box:true}},'我是一个盒子')

const myVnode3 = h('ul',[
    h('li','苹果'),
    h('li','西瓜'),
    h('li',[
        h('div',[
            h('p','菠萝'),
            h('p','哈密瓜')
        ])
    ]),
    h('li',[h('span','枇杷'),h('span','榴莲')]),
])
// 让虚拟节点上树
const container = document.getElementById("container")
patch(container,myVnode3)

/**
 * 注意： diff算法只有是同一个虚拟节点，才能进行精细比较
 *        值进行同层比较，不会进行跨层比较 
 */
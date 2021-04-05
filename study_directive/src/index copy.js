import observe from './observe'
import Watcher from './Watcher'
var obj = {
    a:{
        m:{
            n:123
        }
    },
    b:321,
    g:[1,12,2,4]
}

observe(obj)
// obj.a.m.n++
// obj.g.splice(2,1,[123,333])
obj.b = 10
new Watcher(obj,'a.m.n',(val)=>{
    console.log('★',val);
})
obj.a.m.n = 88
console.log(obj);

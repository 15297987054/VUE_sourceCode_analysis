// 返回一个数组
export default function(attrsString){
    if(attrsString == undefined) return []
    // 当前是否在引号内
    var isYiHao = false
    // 断点
    var point = 0
    // 结果数组
    var result = []
    // 遍历attrsString
    for(let i=0;i<attrsString.length;i++){
        let char = attrsString[i]
        if(char == '"'){
            isYiHao = !isYiHao
        } else if (char == ' ' && !isYiHao){
            // 遇见了空格，并且不在引号中
            console.log(i);
            if(!/^\s*$/.test(attrsString.slice(point,i))){
                result.push(attrsString.slice(point,i).trim())
                point = i
            }
        }
    }
    // 循环结束之后还剩最后一个属性k='v'
    result.push(attrsString.slice(point).trim())
    // 下面的代码功能是将['k=v','k=v'] 变为 [{name:k,value:v},{name:k,value:v}]
    result = result.map(item=>{
        // 根据等号拆分
       const o = item.match(/^(.+)="(.+)"$/)
       return {
           name:o[1],
           value:o[2]
       }
    })
    return result
}
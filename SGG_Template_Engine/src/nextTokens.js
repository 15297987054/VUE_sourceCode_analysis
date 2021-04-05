/**
 * 
 * @param {函数功能} tokens 
 */
export default function nextTokens(tokens){
    console.log(tokens);
    // 结果数组
    var nextTokens = [];
    var sections = []
    // 收集器,天生指向nextTokens结果数组，引用类型值，所以指向的时同一个数组
    // 收集器的指向会变化，当遇见#时，收集器会指向这个token的下标为2的新数组
    var collector = nextTokens
    for(let i=0;i<tokens.length;i++){
        let token = tokens[i]
        switch(token[0]){
            case '#':
                // 收集器中放入token
                collector.push(token)
                // 入栈
                sections.push(token)
                // 收集器要换人,给token添加下标为2的项，并且让收集器指向它
                collector = token[2] = []
                break
            case '/':
                // 出栈
                sections.pop()
                // 改变收集器为栈结构队尾（队尾是栈顶）
                collector = sections.length>0?sections[sections.length-1][2]:nextTokens
                break
            default:
                collector.push(token)
        }
    }
    return nextTokens
}
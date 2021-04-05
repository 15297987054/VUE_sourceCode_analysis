import parseAttrsString from './parseAttrsString'
export default function parse(templateString){
    // 指针
    var index = 0
    // 剩余部分
    var rest = ''
    // 开始标记
    var startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/
    // 结束标记
    var endRegExp = /^\<\/([a-z]+[1-6]?)\>/
    // 装备两个栈
    var stack1 = []
    var stack2 = [{children:[]}]
    // 抓取结束标记前的文字
    var wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/
    while(index < templateString.length-1){
        rest = templateString.slice(index)
        // 识别遍历到的这个字符，是不是一个开始标签
        if(startRegExp.test(rest)){
            let tag = rest.match(startRegExp)[1]
            let attrsString = rest.match(startRegExp)[2]
            // console.log('检测到开始标记',tag);
            // 将开始标记推入栈中
            stack1.push(tag)
            stack2.push({tag:tag,children:[],attrs:parseAttrsString(attrsString)})
            // 指针移动标签长度+2，因为<>也占两位
            const attrsStringLength = attrsString?attrsString.length:0
            index += tag.length + 2 + attrsStringLength
        }else if(endRegExp.test(rest)){
            // 识别遍历到这个字符，是不是一个结束标签
            // 指针移动标签的长度加3，为什么要加3，因为</>也占3位
            let tag = rest.match(endRegExp)[1]
            // console.log('检测到结束标记',tag);
            let pop_tag = stack1.pop()
            // 此时tag一定是与栈1顶部是相同的
            if(tag === pop_tag){
                let pop_arr = stack2.pop()
                if(stack2.length>0){
                    stack2[stack2.length - 1].children.push(pop_arr)
                }
            }else {
                throw new Error(pop_tag+'标签没有封闭！！')
            }
            index += tag.length + 3
        } else if(wordRegExp.test(rest)){
            // 识别文字,并且不能是全空
            let word = rest.match(wordRegExp)[1]
            if(!/^\s+$/.test(word)){
                // 全是空
                // console.log('检测到文字',word);
                // 推入到stack2栈顶元素中
                stack2[stack2.length - 1].children.push({text:word,type:3})
            }
            index += word.length
        } else {
            // 标签中的文字
            index++
        }
    }
    // 此时stack2就是我们之前默认放置的一项，此时要返回这个一项的children即可
    return stack2[0].children[0]
}
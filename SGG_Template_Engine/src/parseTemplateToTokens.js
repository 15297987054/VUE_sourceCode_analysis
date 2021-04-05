import Scanner from './Scanner'
import nextTokens from './nextTokens'
/**
 * 将模板字符串变为tokens数组
 */
export default function parseTemplateToTokens(template){
    var tokens = []
    // 创建扫描器
    var scanner = new Scanner(template)
    var words;
    // 让扫描器工作
    while(scanner.eos()){
        // 搜集考试标记出现之前的文字
        words = scanner.scanUtil('{{')
        if(words!=''){
            // 判断是普通文字中的空格还是标签中的空格，
            // 标签中的空格不能去掉，比如<div class='box'>
            let isInJJH = false;
            // 空白字符串
            var _words = ''
            for (let i=0;i<words.length;i++){
                // 判断是否在标签里
                if(words[i] == '<'){
                    isInJJH = true
                }else if(words[i] == '>'){
                    isInJJH = false
                }
                // 如果这项不是空格，拼接上
                if(!/\s/.test(words[i])){
                    _words += words[i]
                }else if(isInJJH){
                    // 如果这项是空格，只有在标签内的时候才拼接
                    _words += ' '
                }
            }
            // 存起来
            tokens.push(['text',_words])
        }
        // 过双大括号
        scanner.scan('{{')
        // 收集开始标记出现之后的文字
        words = scanner.scanUtil('}}')
        if(words!=''){
            // 这个words就是{{}}中间的东西，判断一下首字符
            if(words[0] == '#'){
                // 存起来，从下标为1的项开始存，因为下标为0的项是#
                tokens.push(['#',words.substring(1)])
            }else if(words[0] == '/'){
                // 存起来，从下标为1的项开始存，因为下标为0的项是/
                tokens.push(['/',words.substring(1)])
            } else {
                tokens.push(['name',words])
            }
             // 存起来
        }
        // 过双大括号
        scanner.scan('}}')
    }
    return nextTokens(tokens)
}
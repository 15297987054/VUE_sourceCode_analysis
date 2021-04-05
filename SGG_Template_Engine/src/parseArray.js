import lookup from './lookup'
import renderTemplate from './renderTemplate'
/**
 * 处理数组，结合renderTemplate 实现递归
 * 注意：此函数收的参数是token，而不是tokens！
 * token是什么，就是一个简单的 [‘#’，‘student’,[]]
 * 
 * 这个函数要递归调用renderTemplate函数，调用几次？
 *      调用次数由data决定
 */

 export default function parseArray(token,data){
    // 得到整体数据中这个数组要使用的部分
    var v = lookup(data,token[1])
    // 结果字符串
    var resultStr = ''
    // 遍历v数组
    for(let i=0;i<v.length;i++){
        // 这里要补一个 ‘.’ 的识别
        resultStr += renderTemplate(token[2],{
             // 现在这个对象就是v[i]的展开
             ...v[i],
             // 补充一个点属性
            '.':v[i],
        })
    }
    return resultStr
 }
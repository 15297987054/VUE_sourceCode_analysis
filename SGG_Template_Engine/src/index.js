
import parseTemplateToTokens from './parseTemplateToTokens'
import renderTemplate from './renderTemplate'
import lookup from './lookup'
window.SSG_Template_Engine = {
    // 渲染函数
    render(template,data){
        // 调用parseTemplageToTokens函数，让模板字符串可以变为tokens数组
        var tokens = parseTemplateToTokens(template)
        // 调用renderTemplate函数，让tokens数组变为dom字符串
        var domstr = renderTemplate(tokens,data)
        return domstr
    }
}
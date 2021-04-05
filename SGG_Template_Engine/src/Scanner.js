/**
 * 扫描器类
 */
export default class Scanner {
    constructor(template){
        this.template = template
        // 指针
        this.pos = 0;
        // 尾巴，一开始就是模板字符串的原文
        this.tail = template
    }
    // 功能弱，就是走过的指定内容，没有返回值
    scan(tag){
        if(this.tail.indexOf(tag)===0){
            // tag有多长，比如{{长度为2，就让指针后移多少位
            this.pos += tag.length
            // 尾巴也要变
            this.tail = this.template.substring(this.pos)
        }
    }
    // 让指针进行扫描，直到遇到指定内容结束，并且能够返回结束之前路过的文字
    scanUtil(stopTag){
        // 记录开始执行本方法时pos的值
        const pos_backup = this.pos
        // 当尾巴的开头不是stopTag的时候，就说明还没有扫描到stopTag
        while(this.tail.indexOf(stopTag)!=0 && this.eos()){
            this.pos++
            // 改变尾巴为从当前指针字符开始，到最后的全部字符
            this.tail = this.template.substr(this.pos)
        }
        return this.template.substring(pos_backup,this.pos)
    }
    // 判断是否扫描完毕
    eos(){
        return this.pos < this.template.length
    }

}
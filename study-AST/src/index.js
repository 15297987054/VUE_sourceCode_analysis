import parse from './parse'

var templateString = `<div>
        <h3 class="aa bb cc" id="mybox">你好</h3>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
        <div>
            <div>哈哈</div>
        </div>
    </div>`

const ast = parse(templateString)
console.log(ast);
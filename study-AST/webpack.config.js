module.exports = {
    entry: './src/index',
    output: {
        publicPath: 'xuni',
        filename: 'bundle.js'
    },
    devServer:{
        port:8000,
        contentBase:'www',
        open:true
    }
}
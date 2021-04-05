module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'boundle.js',
        publicPath:'xuni'
    },
    devServer:{
        port:8000,
        open:true,
        contentBase:'www'
    }
}
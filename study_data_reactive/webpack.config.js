
module.exports = {
    entry: './src/index.js',
    output:{
        publicPath:'xuni',
        filename:'boundle.js',
    },
    devServer:{
        port: 8000,
        contentBase: 'www',
        open:true
    }
}
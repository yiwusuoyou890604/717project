let webpack = require('webpack')
const path = require('path');
let dir = process.cwd();//获取当前程序运行的目录

let baseConfig = {
    entry:{
        "bundle":dir + '/src/main'
    },
    output:{
        "filename":'[name].js',
        "path":dir + '/dist',
        publicPath:'/'
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                use:['babel-loader'],
                exclude:path.resolve(__dirname, 'node_modules/')
            },
           {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader'],
                exclude: path.resolve(__dirname, 'node_modules/')
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader'],
                exclude: path.resolve(__dirname, 'node_modules/')
            },
            {
                test:/\.(eot|svg|ttf|woff)$/,
                use:['file-loader']
            },
            {
                test:/\.(jpg|png|gif)$/,
                use:['file-loader']
            }
        ]
    },
    resolve:{
        extensions:['.js','.jsx']
    },
    plugins:[
    ]
}

module.exports = baseConfig;
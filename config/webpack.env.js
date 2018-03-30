let webpack = require('webpack');
let baseConfig = require('./webpack.base');
let DefinePlugin = webpack.DefinePlugin;

baseConfig.plugins.push(new DefinePlugin({
    "process.env":'"development"'
}))
module.exports = {
    ...baseConfig,
    devServer:{
        historyApiFallback:true,
        open:true,
        port:4000,
        inline:true,
        noInfo:true
    },
    devtool:'eval-source-map'
}
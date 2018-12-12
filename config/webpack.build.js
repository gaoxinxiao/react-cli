const baseConfig = require('./webpack.base')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");
const webpack = require('webpack')
const DefinePlugin = webpack.DefinePlugin
let website = {
    publicPath: "."
}

baseConfig.plugins.push(
    new DefinePlugin({
        'process.env': '"production"'
    }),
    // new UglifyJsPlugin(),
    new PurifyCSSPlugin({
        //这里配置了一个paths，主要是需找html模板，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了。
        paths: glob.sync(path.join(__dirname, '../src/*.html')),
    })
)
// baseConfig.optimization = {
//     minimizer: [new UglifyJsPlugin()]
// }
baseConfig.output.publicPath = website.publicPath
module.exports = {
    ...baseConfig
}
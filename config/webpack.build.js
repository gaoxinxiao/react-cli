const baseConfig = require('./webpack.base')
const path = require('path')
const uglify = require('uglifyjs-webpack-plugin');
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");
const webpack = require('webpack')
const DefinePlugin = webpack.DefinePlugin

baseConfig.plugins.push(
    new DefinePlugin({
        'process.env':'"production"'
    }),
    new uglify(),
    new PurifyCSSPlugin({
        //这里配置了一个paths，主要是需找html模板，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了。
        paths: glob.sync(path.join(__dirname, 'src/*.html')),
    }),

)

module.exports = {
    ...baseConfig
}
const baseConfig = require('./webpack.base')
const path = require('path')
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");
const webpack = require('webpack')
const DefinePlugin = webpack.DefinePlugin
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const uglifyjs = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

baseConfig.plugins.push(
    new DefinePlugin({
        'process.env': '"production"'
    }),
    new MiniCssExtractPlugin({
        filename: "css/style.css"
    }),
    /** 
     * 这里配置一个paths，主要是需找html模板，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了。
     */
    new PurifyCSSPlugin({
        paths: glob.sync(path.join(__dirname, 'src/*.html')),
    }),
    new CleanWebpackPlugin(['../dist'], {
        allowExternal: true
    })
)
baseConfig.optimization.minimizer.push(
    new uglifyjs(),
    new optimizeCss()
)
module.exports = {
    ...baseConfig
}
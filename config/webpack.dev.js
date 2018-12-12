const path = require('path')
const baseConfig = require('./webpack.base')
const webpack = require('webpack')
const DefinePlugin = webpack.DefinePlugin
const htmlPlugin = require('html-webpack-plugin')

baseConfig.plugins.push(
    new DefinePlugin({
        'process.env': '"development"'
    }),
    new htmlPlugin({
        minify: { //对html进行压缩
            removeAttributeQuotes: true //去掉属性的双引号
        },
        hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存js
        template: "./public/index.html"
    }), new webpack.HotModuleReplacementPlugin(),new webpack.NamedChunksPlugin())

module.exports = {
    ...baseConfig,
    devServer: {
        //设置目录基本结构
        contentBase: path.resolve(__dirname, '../dist'),
        host: "localhost",
        //服务端压缩是否开始
        compress: true,
        port: 3000,
        // open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        hot: true,
        hotOnly:true,
        inline:true,
        proxy: {}
    },
    devtool: 'eval-source-map'
}
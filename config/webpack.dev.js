const path = require('path')
const baseConfig = require('./webpack.base')
const webpack = require('webpack')
const DefinePlugin = webpack.DefinePlugin
// const Chalk = require('chalk')

baseConfig.plugins.push(
    new DefinePlugin({
        'process.env': '"development"'
    }),
)

module.exports = {
    ...baseConfig,
    devServer: {
        //设置目录基本结构
        contentBase: path.resolve(__dirname, '../dist'),
        historyApiFallback: true,
        noInfo: true,
        host: "localhost",
        //服务端压缩是否开始
        compress: true,
        port: 3000,
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {}
    },
    devtool: 'eval-source-map'
}
const path = require('path')
const baseConfig = require('./webpack.base')
const webpack = require('webpack')
const DefinePlugin = webpack.DefinePlugin

let website = {
    publicPath: "http://localhost:3000"
}

baseConfig.plugins.push(
    new DefinePlugin({
        'process.env': '"development"'
    }),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedChunksPlugin()
)
baseConfig.output.publicPath = website.publicPath

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
        // hot: true,
        // hotOnly: true,
        // inline: true,
        proxy: {}
    },
    devtool: 'eval-source-map'
}
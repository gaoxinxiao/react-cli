const path = require('path')
const baseConfig = require('./webpack.base')
const webpack = require('webpack')
const DefinePlugin = webpack.DefinePlugin
// const Chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server')

let cssloader = [{
    loader: require.resolve('css-loader')
}, {
    loader: require.resolve('postcss-loader'),
    options: {
        ident: 'postcss',
        plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('autoprefixer')({
                browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
            }),
        ],
    },
}]
baseConfig.plugins.push(
    new DefinePlugin({
        'process.env': '"development"'
    }),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedChunksPlugin()
)

module.exports = {
    ...baseConfig,
    devServer: {
        //设置目录基本结构
        contentBase: path.resolve(__dirname, '../build'),
        historyApiFallback:true,
        noInfo:true,
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
const baseConfig = require('./webpack.base')
const path = require('path')
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");
const webpack = require('webpack')
const DefinePlugin = webpack.DefinePlugin
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const uglifyjs = require('uglifyjs-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin')

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

baseConfig.module.rules.push({
    test: /\.css$/,
    use: extractTextPlugin.extract({
        fallback: "style-loader",
        use: [...cssloader]
    })
}, {
    test: /\.less$/,
    use: extractTextPlugin.extract({
        fallback: "style-loader",
        use: ["less-loader", ...cssloader],
    })
}, {
    test: /\.scss$/,
    use: extractTextPlugin.extract({
        fallback: "style-loader",
        use: ["sass-loader", ...cssloader],
    })
})
baseConfig.plugins.push(
    new DefinePlugin({
        'process.env': '"production"'
    }),
    new extractTextPlugin("css/style.css"),
    /** 
     * 这里配置一个paths，主要是需找html模板，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了。
     */
    new PurifyCSSPlugin({
        paths: glob.sync(path.join(__dirname, 'src/*.html')),
    })
)
baseConfig.optimization.minimizer.push(new optimizeCss())
baseConfig.optimization.minimizer.push(new uglifyjs())
module.exports = {
    ...baseConfig
}
const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
const Chalk = require('chalk')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let publicFlag = process.env.ENV_MODE == 'dev'

let website = {
    publicPath: publicFlag ? '/' : "."
}

let cssloader = [{
    loader: require.resolve('css-loader')
}, {
    loader: require.resolve('postcss-loader'),
    options: {
        ident: 'postcss',
        plugins: () => [
            require('postcss-flexbugs-fixes'), //修复flexbug问题
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


console.log(publicFlag ? Chalk.green('------开发环境... localhost:3000') : Chalk.blue('------打包环境...------'))

module.exports = {
    entry: ["babel-polyfill", "./src/index.tsx"],
    output: {
        chunkFilename: '[name].bundle.js',
        filename: "js/[name].[hash:5].js",
        publicPath: website.publicPath
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
        alias: {
            "@": path.join(__dirname, '../src'),
            "~": path.join(__dirname, '../node_modules'),
        }
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: "/node_modules/"
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [publicFlag ? "style-loader" : MiniCssExtractPlugin.loader, ...cssloader]
            }, {
                test: /\.less$/,
                use: [publicFlag ? "style-loader" : MiniCssExtractPlugin.loader, "less-loader", ...cssloader]
            }, {
                test: /\.scss$/,
                use: [publicFlag ? "style-loader" : MiniCssExtractPlugin.loader, "sass-loader", ...cssloader]
            },
            {
                test: /\.(png|jpg|gif|jpe?g|woff|svg|eot|ttf)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 500, //是把小于500B的文件打成Base64的格式，写入JS
                        outputPath: 'images/'
                    }
                }]
            }
        ]
    },
    //资源限制
    performance: {
        hints: false
    },
    optimization: {
        minimizer: []
    },
    plugins: [
        new htmlPlugin({
            minify: { //对html进行压缩
                removeAttributeQuotes: true, //去掉属性的双引号
                html5: true
            },
            hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存js
            template: "./public/index.html"
        }),
    ]
}
const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
const Chalk = require('chalk')

let website = {
    publicPath: process.env.ENV_MODE == 'dev' ? '/' : "."
}

console.log(process.env.ENV_MODE == 'dev' ? Chalk.green('------开发环境... localhost:3000') : Chalk.blue('------打包环境...------'))

module.exports = {
    entry: ["babel-polyfill", "./src/index.tsx"],
    output: {
        path: path.resolve(__dirname, '../build'),
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
    performance: {
        hints: false
    },
    optimization: {
        minimizer: []
    },
    plugins: [
        new htmlPlugin({
            minify: { //对html进行压缩
                removeAttributeQuotes: true //去掉属性的双引号
            },
            hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存js
            template: "./public/index.html"
        }),
    ]
}
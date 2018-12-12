const path = require('path')
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");

// let cssloader ={
//     loader: require.resolve('postcss-loader'),
//     options: {
//         ident: 'postcss',
//         plugins: () => [
//             require('postcss-flexbugs-fixes'),
//             require('autoprefixer')({
//                 browsers: [
//                     '>1%',
//                     'last 4 versions',
//                     'Firefox ESR',
//                     'not ie < 9', // React doesn't support IE8 anyway
//                 ],
//                 flexbox: 'no-2009',
//             }),
//         ],
//     },
// },

module.exports = {
    entry: {
        app: "./src/app.ts"
    },
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: "js/[name].[hash:5].js",
        publicPath: website.publicPath
    },
    resolve: {
        extensions: ['.js', '.jsx', 'tsx', 'ts'],
        alias: {
            "@": path.join(__dirname, '../src')
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
                use: {
                    loader: require.resolve('awesome-typescript-loader')
                }
            },
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            },
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader",
                        {
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
                        },
                    ]
                })
            },
            {
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    use: ["css-loader", "less-loader",
                        {
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
                        },
                    ],
                    fallback: "style-loader",
                })
            },
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    use: [{
                            loader: "css-loader"
                        }, {
                            loader: "sass-loader"
                        },
                        {
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
                        },
                    ],
                    fallback: "style-loader",
                })
            }, {
                test: /\.(png|jpg|gif|jpe?g)$/,
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
    plugins: [
        new uglify(),
        new htmlPlugin({
            minify: { //对html进行压缩
                removeAttributeQuotes: true //去掉属性的双引号
            },
            hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存js
            template: "./public/index.html"
        }),
        new extractTextPlugin("css/style.css"),
        new PurifyCSSPlugin({
            //这里配置了一个paths，主要是需找html模板，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了。
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
        }),
    ],
    devServer: {
        //设置目录基本结构
        contentBase: path.resolve(__dirname, '../dist'),
        host: "localhost",
        //服务端压缩是否开始
        compress: true,
        port: 3000
    }
}
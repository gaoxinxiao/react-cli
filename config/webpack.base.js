const path = require('path')
const extractTextPlugin = require('extract-text-webpack-plugin')

let website = {
    publicPath: "http://localhost:3000"
}

let cssloader = [{
    loader: require.resolve('css-loader'),
    options: {
        importLoaders: 1,
    },
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

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        app: "./src/app.ts"
    },
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
                    use: [...cssloader]
                })
            },
            {
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["less-loader", ...cssloader],
                })
            },
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["sass-loader", ...cssloader],
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
        new extractTextPlugin("css/style.css"),
    ]
}
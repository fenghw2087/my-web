/**
 * Created by 2087 on 2018/8/20.
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entry = require('./config/entry.config');
const styleConfig = require('./config/style.config');

module.exports = {
    devtool: 'eval-source-map',
    entry:entry,
    output:{
        filename: 'js/[name].js',
        path: path.join(__dirname, './dev-bundle/'),
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        rules: [{
            test: /\.css$/,
            exclude: [path.resolve(__dirname, './node_modules'),path.resolve(__dirname, './src/jq-component')],
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]", "postcss-loader"]
            })
        },{
            test: /\.less$/,
            exclude: [path.resolve(__dirname, './node_modules'),path.resolve(__dirname, './src/jq-component')],
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]", "postcss-loader", `less-loader?{modifyVars:${JSON.stringify(styleConfig)}}`]
            })
        },{
            test: /\.css$/,
            include: [path.resolve(__dirname, './node_modules'),path.resolve(__dirname, './src/jq-component')],
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "postcss-loader"]
            })
        },{
            test: /\.less$/,
            include: [path.resolve(__dirname, './node_modules'),path.resolve(__dirname, './src/jq-component')],
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "postcss-loader", `less-loader?{modifyVars:${JSON.stringify(styleConfig)}}`]
            })
        },{
            test: /\.(js|jsx)$/,
            use: [{
                loader:'babel-loader?cacheDirectory=true',
            }],
            include: path.join(__dirname, './src')
        },{
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name:'images/[name].[ext]',
                    publicPath:'/'
                }
            }]
        },{
            test: /\.(woff|svg|eot|TTF|ttf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name:'font/[name].[ext]',
                    publicPath:'/'
                }
            }]
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, './'),
        historyApiFallback: true,
        host: 'localhost',
        port: 11111,
        // proxy: {
        //     '/api': {
        //         target:'http://192.168.0.3:8080',
        //         // target: 'http://http://47.74.129.24',
        //         pathRewrite: {'^/api' : ''}
        //     }
        // }
    },
    plugins:[
        ...Object.keys(entry).map(v=>{
            return new HtmlWebpackPlugin({
                template: `./src/html/${ v==='portal'?'index':v }.html`, // 源模板文件
                filename: `./${ v==='portal'?'index':v }.html`, // 输出文件【注意：这里的根路径是module.exports.output.path】
                showErrors: true,
                inject: 'body',
                chunks: ['vendor','common',v]
            })
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/[name].js',
            minChunks: function (module,count) {
                return (
                    module.resource &&
                    count >= 2 &&
                    module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/[name].js',
            chunks: Object.keys(entry)
        }),
        new webpack.HashedModuleIdsPlugin(),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks:true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"dev"'
            }
        })
    ]
};
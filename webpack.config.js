/**
 * Created by 2087 on 2017/12/26.
 */
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entry = require('./config/entry.config');
const styleConfig = require('./config/style.config');
const output = path.resolve(__dirname,'./dist/');

module.exports = {
    entry:entry,
    output:{
        filename: 'js/[name]-[chunkhash].js',
        path: output,
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
                use: ["css-loader?modules&localIdentName=[name]-[hash:base64:5]", "postcss-loader"]
            })
        },{
            test: /\.less$/,
            exclude: [path.resolve(__dirname, './node_modules'),path.resolve(__dirname, './src/jq-component')],
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader?modules&localIdentName=[name]-[hash:base64:5]", "postcss-loader", `less-loader?{modifyVars:${JSON.stringify(styleConfig)}}`]
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
                    name:'images/[name]-[hash].[ext]',
                    publicPath:'/static2/'
                }
            }]
        },{
            test: /\.(woff|svg|eot|TTF|ttf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name:'font/[name]-[hash].[ext]',
                    publicPath:'/static2/'
                }
            }]
        }]
    },
    plugins:[
        new CleanWebpackPlugin([
            path.join(output, 'js/*.js'),
            path.join(output, 'css/*.css'),
            path.join(output, 'images/*.*'),
            path.join(output, 'font/*.*')
        ]),
        new UglifyJSPlugin(),
        new webpack.HashedModuleIdsPlugin(),
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
            filename: 'js/[name]-[chunkhash].js',
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
            filename: 'js/[name]-[chunkhash].js',
            chunks: Object.keys(entry)
        }),
        new ExtractTextPlugin({
            filename: 'css/[name]-[chunkhash].css',
            allChunks:true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        })
    ]
};
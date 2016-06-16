/**
 * Created by yantianyu on 2016/5/25 0025.
 */
var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'static/dev');
var BUILD_PATH = path.resolve(ROOT_PATH, 'static/build');
var TEM_PATH = path.resolve(ROOT_PATH, 'static/dev/templates');

module.exports = {
    entry: APP_PATH,
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    externals: {
        'jquery': 'jQuery',
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-router':'ReactRouter',
        'moment': 'moment',
        'echarts': 'echarts'
    },
    plugins: [
        new htmlWebpackPlugin({
            title: '闲鱼参考价',
            template: path.resolve(TEM_PATH, 'index.html')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                include: APP_PATH,
                query: {
                    presets: ['es2015','react']
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    devtool: false    //'eval-source-map'
};
/**
 * Created by yantianyu on 2016/5/25 0025.
 */
var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'static/dev');
var BUILD_PATH = path.resolve(ROOT_PATH, 'static/build');

module.exports = {
    entry: APP_PATH,
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    externals: {
        'jquery': 'jQuery',
        'react': 'React',
        'react-dom':'ReactDOM',
        'moment': 'moment',
        'echarts': 'echarts'
    },
    plugins: [
        new htmlWebpackPlugin({
            title: '闲鱼参考价',
            template: './static/templates/index.html'
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
                    presets: ['react']
                }
            }
        ]
    },
    devtool: false    //'eval-source-map'
};
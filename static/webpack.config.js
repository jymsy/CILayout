var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    // entry: './js/src/index.js',
    entry: { //配置入口文件，有几个写几个
        learningsystem: './js/src/modules/lc/index.js',
        learningcenter: './js/src/modules/ls/index.js',
    },
    // output: {
    //     path: 'js/dist',
    //     filename: 'app.js'
    // },
    output: {
        path: 'js/dist', //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: 'static/js/dist/',                //模板、样式、脚本、图片等资源对应的server上的路径
        filename: '[name].js',            //每个页面对应的主js的生成配置
        chunkFilename: '[id].chunk.js'   //chunk生成的配置
    },
    module: {
        // preLoaders: [
        //     {
        //         test: /\.js$/,
        //         exclude: /node_modules/,
        //         loader: 'eslint-loader'
        //     },
        // ],
        // loaders: [
        //     { test: /\.css$/, loader: 'style-loader!css-loader' }
        // ]
    },
    eslint: {
        failOnWarning: true,
        failOnError: true,
        // emitError: true,
        configFile: './.eslintrc'
    },
    externals: {
        jquery: 'jQuery'
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: ['learningsystem','learningcenter'], //提取哪些模块共有的部分
            minChunks: 2 // 提取至少3个模块共有的部分
        }),
        // new uglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     output: {
        //         comments: false
        //     }
        // })
    ]
};
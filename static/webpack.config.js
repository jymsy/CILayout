var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    entry: './js/src/index.js',
    output: {
        path: 'js/dist',
        filename: 'app.js'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
        ],
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
    // plugins: [
    //     new uglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         },
    //         output: {
    //             comments: false
    //         }
    //     })
    // ]
};
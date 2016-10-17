var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    entry: './js/src/common.js',
    output: {
        path: 'js/dist',
        filename: 'bundle-[hash].js'
    },
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        new uglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ]
};
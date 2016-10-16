var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    entry: './src/common.js',
    output: {
        path: 'dist',
        filename: 'bundle.js'
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
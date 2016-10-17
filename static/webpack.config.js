var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    entry: './js/src/index.js',
    output: {
        path: 'js/dist',
        filename: 'app.js'
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
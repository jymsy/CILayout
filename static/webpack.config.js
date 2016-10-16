module.exports = {
    entry: './src/common.js',
    output: {
        path: 'dist',
        filename: 'bundle.js'
    },
    externals: {
        jquery: 'jQuery'
    }
};
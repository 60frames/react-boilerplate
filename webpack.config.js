var StatsPlugin = require('stats-webpack-plugin'),
    path = require('path');

module.exports = {
    debug: true,
    devtool: 'source-map',
    entry:  path.join(__dirname, 'src', 'entry.js'),
    target: 'web',
    output: {
        filename: path.join(__dirname, 'dist', 'entry.js')
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'jsx-loader?harmony'
        }]
    },
    plugins: [
        new StatsPlugin(path.join(__dirname, 'dist', 'stats.json'), {
            chunkModules: true
        })
    ]
};
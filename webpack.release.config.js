var webpack = require('webpack'),
    config = require('./webpack.default.config.js'),
    path = require('path');

delete config.devtool;
delete config.debug;
config.output.filename = path.join(__dirname, 'dist/[chunkhash].entry.js');
config.plugins = config.plugins.concat([
    // Setting `NODE_ENV` makes sure we get the production friendly version
    // of React by removing unreachable code when we uglify.
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        output: {
            comments: false
        }
    })
]);

module.exports = config;
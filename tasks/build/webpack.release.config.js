'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./webpack.config');

config.defaultConfig.output.filename = '[chunkhash].entry.js';
delete config.defaultConfig.devtool;
delete config.defaultConfig.debug;
delete config.defaultConfig.module.loaders.exposeReact;

config.defaultConfig.module.loaders.localCss.loader = ExtractTextPlugin.extract(
    'style',
    'css?modules&localIdentName=[hash:base64:5]',
    'autoprefixer'
);

config.defaultConfig.module.loaders.stripDebug = {
    test: /\.js$/,
    loader: 'strip?strip[]=logger.*&strip[]=console.*'
};

// Setting `NODE_ENV` makes sure we get the production friendly version
// of React by removing unreachable code when we uglify.
config.defaultConfig.plugins.define = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: '"production"'
    }
});

config.defaultConfig.plugins.optimize = new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    output: {
        comments: false
    }
});

config.defaultConfig.plugins.extract = new ExtractTextPlugin('[contenthash].css', {
    allChunks: true
});

module.exports = config.convert(config.defaultConfig);

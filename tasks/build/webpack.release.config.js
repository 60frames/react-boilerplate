'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./webpack.config');

// Revision output.
config.defaultConfig.output.filename = '[chunkhash].entry.js';

// Delete dev config.
delete config.defaultConfig.devtool;
delete config.defaultConfig.debug;
delete config.defaultConfig.module.loaders.exposeReact;

// Obfuscate CSS classNames further to save bytes.
config.defaultConfig.module.loaders.localCss.loader = ExtractTextPlugin.extract(
    'style',
    'css?modules&localIdentName=[hash:base64:5]!autoprefixer'
);

// Strip out all `logger` and `console` statements.
config.defaultConfig.module.loaders.stripDebug = {
    test: /\.js$/,
    loader: 'strip?strip[]=logger.*&strip[]=console.*'
};

// Setting `NODE_ENV` makes sure we get the production friendly version
// of React by removing unreachable code when we uglify.
config.defaultConfig.plugins.nodeEnv = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: '"production"'
    }
});

// Minify output. (also indirectly triggers CSS minification)
config.defaultConfig.plugins.minify = new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    output: {
        comments: false
    }
});

// Revision static CSS.
config.defaultConfig.plugins.extractCss = new ExtractTextPlugin('[contenthash].css', {
    allChunks: true
});

module.exports = config.convert(config.defaultConfig);

'use strict';

var webpack = require('webpack');
var config = require('./webpack.config');

// Entry and output are configured by 'karma-webpack' in 'karma.conf.js'.
delete config.defaultConfig.entry;
delete config.defaultConfig.output;

// 'karma-webpack' requires inline source maps.
config.defaultConfig.devtool = 'inline-source-map';

// Ensure CSS module classNames are static.
config.defaultConfig.module.loaders.localCss.loader = 'style!css?modules&localIdentName=[local]!autoprefixer';

// Ensure file names are static and use the file-loader instead of the url-loader
// to prevent base64 encoding.
config.defaultConfig.module.loaders.files.loader = 'file?name=[name].[ext]';

// Keep CSS in JavaScript.
delete config.defaultConfig.plugins.extract;

// No need for stats.
delete config.defaultConfig.plugins.stats;

// Disable code splitting by limiting the number of chunks to 1.
config.defaultConfig.plugins.limitChunkCount = new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
});

module.exports = config.convert(config.defaultConfig);

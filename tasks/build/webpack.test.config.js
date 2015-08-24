'use strict';

var webpack = require('webpack');
var config = require('./webpack.config');

// Entry and output are handled by karma-webpack / karma.conf.js
delete config.defaultConfig.entry;
delete config.defaultConfig.output;

// karma-webpack requires inline source maps.
config.defaultConfig.devtool = 'inline-source-map';

// Ensure css module classNames are static.
config.defaultConfig.module.loaders.localCss.loader = 'style!css?modules&localIdentName=[local]!autoprefixer';

// Remove url-loader's limit param to ensure file's aren't base64 encoded.
config.defaultConfig.module.loaders.fileLoader.loader = 'url';

// Keep css in JavaScript.
delete config.defaultConfig.plugins.extract;

// No need for stats.
delete config.defaultConfig.plugins.stats;

// Disable code splitting by limiting the number of chunks to 1.
config.defaultConfig.plugins.limitChunkCountPlugin = new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
});

module.exports = config.convert(config.defaultConfig);

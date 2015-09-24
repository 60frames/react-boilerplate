'use strict';

var config = require('./webpack.config');
var webpack = require('webpack');
var path = require('path');

config.defaultConfig.entry = './entryServer.js';
config.defaultConfig.output.filename = './entryServer.js';
config.defaultConfig.target = 'node';
config.defaultConfig.output.libraryTarget = 'commonjs2';

// Don't need sourcemaps for server
delete config.defaultConfig.devtool;

// Mock Modernizr tests for the server
config.defaultConfig.plugins.replaceModernizr = new webpack.NormalModuleReplacementPlugin(
    /^modernizr$/,
    path.join(__dirname, 'modernizrMock.js')
);

module.exports = config.convert(config.defaultConfig);

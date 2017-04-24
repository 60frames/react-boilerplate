'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = ({ revision, extractCss }) => [
  new ExtractTextPlugin({
    filename: revision ? '[name].[contenthash].css' : '[name].css',
    allChunks: true,
    disable: !extractCss
  })
];

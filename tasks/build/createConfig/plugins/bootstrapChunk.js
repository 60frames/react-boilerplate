'use strict';

const webpack = require('webpack');

/**
 * Move webpack bootstrap to separate chunk to allow code split chunks to be
 * loaded *before* main.
 */
module.exports = ({ bootstrapChunk, revision }) =>
  (bootstrapChunk
    ? [
        new webpack.optimize.CommonsChunkPlugin({
          name: 'bootstrap',
          filename: revision ? '[name].[chunkhash].js' : '[name].js',
          minChunks: Infinity
        })
      ]
    : []);

'use strict';

const webpack = require('webpack');

module.exports = ({ codeSplitting }) =>
  (!codeSplitting
    ? [
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1
        })
      ]
    : []);

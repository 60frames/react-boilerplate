'use strict';

const webpack = require('webpack');

module.exports = ({ hot }) =>
  (hot
    ? [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      ]
    : []);

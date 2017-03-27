'use strict';

const webpack = require('webpack');

module.exports = ({ optimize, sourceMap }) =>
    optimize
        ? [
              new webpack.optimize.UglifyJsPlugin({
                  compress: {
                      screw_ie8: true,
                      warnings: false
                  },
                  mangle: {
                      screw_ie8: true
                  },
                  output: {
                      screw_ie8: true,
                      comments: false
                  },
                  sourceMap: !!sourceMap
              }),
              // NOTE: Hopefully React will use `REACT_ENV` rather than the
              // overloaded `NODE_ENV` which would make the purpose of this
              // config clearer:
              // https://github.com/facebook/react/issues/6582
              // https://github.com/facebook/react/issues/9245
              new webpack.DefinePlugin({
                  'process.env.NODE_ENV': JSON.stringify('production')
              })
          ]
        : [];

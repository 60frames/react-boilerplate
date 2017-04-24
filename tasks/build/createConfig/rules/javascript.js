'use strict';

module.exports = include => {
  return {
    test: /\.js$/,
    include,
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    }
  };
};

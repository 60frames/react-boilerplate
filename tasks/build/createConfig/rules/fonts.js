'use strict';

module.exports = include => {
  return {
    test: /\.(eot|ttf|woff|woff2)(\?.*)?$/,
    include,
    loader: 'url-loader',
    options: {
      limit: 10000
    }
  };
};

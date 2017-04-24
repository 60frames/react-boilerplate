'use strict';

module.exports = include => {
  return {
    test: /\.(gif|ico|jpg|jpeg|png|svg|webp)$/,
    include,
    loader: 'url-loader',
    options: {
      limit: 10000
    }
  };
};

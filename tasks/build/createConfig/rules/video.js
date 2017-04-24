'use strict';

module.exports = include => {
  return {
    test: /\.(mp4|webm)$/,
    include,
    loader: 'url-loader',
    options: {
      limit: 10000
    }
  };
};

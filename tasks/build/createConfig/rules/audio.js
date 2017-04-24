'use strict';

module.exports = include => {
  return {
    test: /\.(aac|m4a|mp3|oga|ogg|wav)$/,
    include,
    loader: 'url-loader',
    options: {
      limit: 10000
    }
  };
};

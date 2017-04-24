'use strict';

const StatsWebpackPlugin = require('stats-webpack-plugin');

module.exports = ({ stats, name }) =>
  (stats
    ? [
        new StatsWebpackPlugin(`${name}-stats.json`, {
          chunkModules: true
        })
      ]
    : []);

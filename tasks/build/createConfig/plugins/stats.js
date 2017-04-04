'use strict';

const StatsWebpackPlugin = require('stats-webpack-plugin');

module.exports = ({ stats, name }) => {
    if (stats) {
        return [
            new StatsWebpackPlugin(`${name}-stats.json`, {
                chunkModules: true
            })
        ];
    }
    return [];
};

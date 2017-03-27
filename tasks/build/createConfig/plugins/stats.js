'use strict';

const StatsWebpackPlugin = require('stats-webpack-plugin');

module.exports = ({ stats }) => {
    if (stats) {
        return [
            new StatsWebpackPlugin('stats.json', {
                chunkModules: true
            })
        ];
    }
    return [];
};

'use strict';

const generateConfig = require('./generateConfig');

// TODO: fix relative image references from sourcemapped
// css https://github.com/webpack/style-loader#recommended-configuration
module.exports = [
    generateConfig({
        name: 'client',
        debug: true,
        sourceMaps: true,
        stats: true,
        hot: true
    }),
    generateConfig({
        name: 'server',
        node: true
    })
];

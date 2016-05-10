'use strict';

const generateConfig = require('./generateConfig');

module.exports = [
    generateConfig({
        name: 'client',
        optimize: true,
        revision: true,
        extractCss: true,
        stats: true
    }),
    generateConfig({
        name: 'server',
        node: true,
        optimize: true
    })
];

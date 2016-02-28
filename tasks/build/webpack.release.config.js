'use strict';

const generateConfig = require('./generateconfig');

module.exports = generateConfig({
    optimize: true,
    revision: true,
    extractCss: true,
    stats: true
});

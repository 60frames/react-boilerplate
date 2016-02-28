'use strict';

const generateConfig = require('./generateconfig');

// TODO: fix relative image references from sourcemapped
// css https://github.com/webpack/style-loader#recommended-configuration
module.exports = generateConfig({
    debug: true,
    sourceMaps: true,
    stats: true
});

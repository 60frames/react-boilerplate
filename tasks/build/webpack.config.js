'use strict';

const generateConfig = require('./generateConfig');

module.exports = [
    generateConfig({
        name: 'client',
        debug: true,
        sourceMaps: 'eval',
        stats: true,
        hot: true,
        // TODO: Remove the need for `publicPath` once the style / css loader
        // has landed a better fix for relative image references from
        // sourcemapped css.
        // https://github.com/webpack/style-loader#recommended-configuration
        // https://github.com/webpack/style-loader/issues/55
        publicPath: 'http://localhost:6060/'
    }),
    generateConfig({
        name: 'server',
        debug: true,
        node: true,
        sourceMaps: 'eval',
        disableCodeSplitting: true
    })
];

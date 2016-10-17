'use strict';

const debug = require('debug')('app');
const colors = require('colors');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const config = require('../../tasks/build/webpack.config');

debug(colors.yellow('Using webpack-dev-middleware'));

// Don't bail in dev server.
config.forEach(c => c.bail = false);

const router = express.Router();
const compiler = webpack(config);
compiler.apply(new FriendlyErrorsWebpackPlugin());
router.use(webpackDevMiddleware(compiler, {
    quiet: true,
    publicPath: config[0].output.publicPath
}));
router.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client'), {
    log: () => {}
}));
router.use(webpackHotServerMiddleware(compiler, {
    chunkName: 'server'
}));

module.exports = router;

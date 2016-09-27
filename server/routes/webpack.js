'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const config = require('../../tasks/build/webpack.config');

const router = express.Router();
const compiler = webpack(config);

router.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config[0].output.publicPath
}));
router.use(webpackHotMiddleware(compiler));
router.use(webpackHotServerMiddleware(compiler, {
    chunkName: 'server'
}));

module.exports = router;

'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackUniversalRenderer = require('../middleware/webpackUniversalRenderer');
const config = require('../../tasks/build/webpack.config');

const router = express.Router();
const compiler = webpack(config);

router.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config[0].output.publicPath
}));
router.use(webpackHotMiddleware(compiler));
router.use(webpackUniversalRenderer(compiler, {
    universalRendererPath: path.join(__dirname, '../../dist/server.js')
}));

module.exports = router;

'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const javascript = require('./rules/javascript');
const { css, cssModules } = require('./rules/css');
const fonts = require('./rules/fonts');
const images = require('./rules/images');
const video = require('./rules/video');
const audio = require('./rules/audio');
const extractCss = require('./plugins/extractCss');
const optimize = require('./plugins/optimize');
const stats = require('./plugins/stats');
const hmr = require('./plugins/hmr');
const codeSplitting = require('./plugins/codeSplitting');
const bootstrapChunk = require('./plugins/bootstrapChunk');

const SRC_DIR = path.join(__dirname, '../../../src');
const DIST_DIR = path.join(__dirname, '../../../dist');

const DEFAULTS = {
    name: '',
    revision: false,
    node: false,
    sourceMap: false,
    hot: false,
    optimize: false,
    extractCss: false,
    stats: false,
    codeSplitting: true,
    bootstrapChunk: false,
    publicPath: ''
};

/**
 * Creates a Webpack config.
 * @param {string}          options.name           Name of the bundle (and entry point relative to the src dir).
 * @param {boolean}         options.revision       Revision assets for long term caching.
 * @param {boolean}         options.node           Output bundle ready to run in node.
 * @param {string}          options.sourceMap      Output sourcemaps, specifying which devtool to use.
 * @param {boolean}         options.hot            Use HMR.
 * @param {boolean}         options.optimize       Optimize output for release.
 * @param {boolean}         options.extractCss     Extract CSS into external file.
 * @param {boolean}         options.stats          Output build stats.
 * @param {boolean}         options.codeSplitting  Disable split points by limiting max chunks to 1.
 * @param {boolean}         options.bootstrapChunk Pull Webpack bootstrap code into own chunk.
 * @param {string}          options.publicPath     The public path.
 */
module.exports = options => {
    options = Object.assign({}, DEFAULTS, options);

    const {
        name,
        revision,
        node,
        publicPath,
        sourceMap,
        hot
    } = options;

    return {
        name,
        context: SRC_DIR,
        entry: {
            [name]: hot
                ? [
                      'react-hot-loader/patch',
                      'webpack-hot-middleware/client',
                      `./${name}`
                  ]
                : `./${name}`
        },
        output: {
            path: DIST_DIR,
            filename: revision ? '[name].[chunkhash].js' : '[name].js',
            libraryTarget: node ? 'commonjs2' : 'var',
            publicPath
        },
        module: {
            rules: [
                javascript(SRC_DIR),
                css(/node_modules/, options),
                cssModules(SRC_DIR, options),
                fonts(SRC_DIR),
                images(SRC_DIR),
                video(SRC_DIR),
                audio(SRC_DIR)
            ]
        },
        resolve: {
            modules: [SRC_DIR, 'node_modules']
        },
        plugins: [
            ...extractCss(options),
            ...optimize(options),
            ...stats(options),
            ...hmr(options),
            ...codeSplitting(options),
            ...bootstrapChunk(options)
        ],
        devtool: sourceMap ? sourceMap : '',
        target: node ? 'node' : 'web',
        externals: node
            ? fs
                  .readdirSync('node_modules')
                  .filter(
                      // Bundle react-loadable to avoid having to define
                      // `serverSideRequirePath` as well as `webpackRequireWeakId`
                      // in Loadable HoCs.
                      x => !x.includes('.bin') && !x.includes('react-loadable')
                  )
                  .reduce(
                      (externals, mod) => {
                          externals[mod] = `commonjs ${mod}`;
                          return externals;
                      },
                      {}
                  )
            : {},
        node: {
            // Prevents the `process.env` defined on the `window` in Html.js
            // from being re-defined inside modules by https://github.com/webpack/node-libs-browser
            process: false
        },
        bail: true
    };
};

'use strict';

const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SimpleDefinePlugin = require('simple-define-webpack-plugin');
const path = require('path');
const fs = require('fs');

const SRC_DIR = path.join(__dirname, '../../src');
const DIST_DIR = path.join(__dirname, '../../dist');

/**
 * Generates the Webpack config.
 * @param {String}   options.name                 Name of the bundle (and entry point relative to the src dir).
 * @param {Boolean}  options.revision             Revision assets for long term caching.
 * @param {Boolean}  options.node                 Output bundle ready to run in node.
 * @param {Boolean}  options.debug                Debug mode.
 * @param {Boolean}  options.sourceMaps           Output source maps.
 * @param {Boolean}  options.hot                  Use HMR.
 * @param {Boolean}  options.optimize             Optimize output for release.
 * @param {Boolean}  options.extractCss           Extract CSS into external file.
 * @param {Boolean}  options.stats                Output build stats.
 * @param {Boolean}  options.disableCodeSplitting Limits number of chunks to 1.
 */
module.exports = function generateConfig(options) {
    options = options || {};

    const config = {
        name: options.name,
        context: SRC_DIR,
        entry: {
            [options.name]: [`./${options.name}`]
        },
        output: {
            path: DIST_DIR,
            filename: options.revision ? '[name].[chunkhash].js' : '[name].js'
        },
        module: {
            loaders: getLoaders(options)
        },
        resolve: {
            root: [
                SRC_DIR
            ]
        },
        target: options.node ? 'node' : 'web',
        debug: !!options.debug,
        plugins: getPlugins(options),
        node: {
            // Prevents the `process.env` defined on the `window` in Html.js
            // from being re-defined inside modules by https://github.com/webpack/node-libs-browser
            process: false
        },
        // NOTE: This will become the default bahviour in Webpack 2.x
        bail: true
    };

    if (options.publicPath) {
        config.output.publicPath = options.publicPath;
    }

    if (options.node) {
        config.output.libraryTarget = 'commonjs2';
        config.externals = fs.readdirSync('node_modules')
            .filter(x => !x.includes('.bin'))
            .reduce((externals, mod) => {
                externals[mod] = `commonjs ${mod}`;
                return externals;
            }, {});
    }

    if (options.sourceMaps) {
        config.devtool = typeof options.sourceMaps === 'string'
            ? options.sourceMaps : 'source-map';
    }

    if (options.hot) {
        config.entry[options.name].unshift('webpack-hot-middleware/client');
        config.entry[options.name].unshift('react-hot-loader/patch');
    }

    return config;
};

function getLoaders(options) {
    let loaders = [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /modernizr.js$/,
            loader: 'exports-loader?window.Modernizr'
        }, {
            test: /\.(jpe?g|png|gif|svg|woff|ttf|eot)$/i,
            loader: 'url-loader?limit=10000'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }
    ];

    if (options.optimize) {
        // Strip out all `console` statements.
        loaders.push({
            test: /\.js$/,
            loader: 'strip-loader?strip[]=console.*'
        });
    }

    loaders = loaders.concat(getCssLoaders(options));

    return loaders;
}

function getCssLoaders(options) {
    const loaders = [];
    let styleLoader = 'style-loader';
    let cssLoader = options.node ? 'css-loader/locals' : 'css-loader';
    let cssModulesLoader;
    let autoprefixerLoader = 'autoprefixer-loader';
    let cssLoaders;
    let cssModulesLoaders;

    if (options.optimize) {
        cssModulesLoader = `${cssLoader}?modules`;
    } else {
        cssModulesLoader = `${cssLoader}?modules&localIdentName=[name]_[local]_[hash:base64:5]`;
    }

    if (options.sourceMaps) {
        cssLoader = `${cssLoader}?sourceMap`;
        cssModulesLoader = `${cssModulesLoader}&sourceMap`;
    }

    if (options.node) {
        cssLoaders = cssLoader;
        cssModulesLoaders = cssModulesLoader;
    } else if (options.extractCss) {
        cssLoaders = ExtractTextPlugin.extract(
            `${styleLoader}`,
            `${cssLoader}`
        );
        cssModulesLoaders = ExtractTextPlugin.extract(
            `${styleLoader}`,
            `${cssModulesLoader}!${autoprefixerLoader}`
        );
    } else {
        cssLoaders = `${styleLoader}!${cssLoader}`;
        cssModulesLoaders = `${styleLoader}!${cssModulesLoader}!${autoprefixerLoader}`;
    }

    // Global CSS
    // We make the assumption that all CSS in node_modules is either
    // regular 'global' css or pre-compiled.
    loaders.push({
        test: /\.css$/,
        include: /node_modules/,
        loader: cssLoaders
    });

    // CSS modules
    loaders.push({
        test: /\.css$/,
        exclude: /node_modules/,
        loader: cssModulesLoaders
    });

    return loaders;
}

function getPlugins(options) {
    let plugins = [];

    if (options.optimize) {
        // Minify output. (also indirectly triggers CSS minification)
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }));
        plugins.push(new webpack.optimize.OccurenceOrderPlugin());
        // Setting `NODE_ENV` makes sure we get the production friendly version
        // of React by removing unreachable code when we uglify.
        plugins.push(new SimpleDefinePlugin({
            'process.env.NODE_ENV': 'production'
        }));
    }

    if (options.stats) {
        plugins.push(new StatsPlugin('stats.json', {
            chunkModules: true
        }));
    }

    if (options.extractCss) {
        plugins.push(new ExtractTextPlugin(options.revision ? '[name].[contenthash].css' : '[name].css', {
            allChunks: true
        }));
    }

    if (options.disableCodeSplitting) {
        plugins.push(new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }));
    }

    if (options.hot) {
        plugins.push(new webpack.optimize.OccurenceOrderPlugin());
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new webpack.NoErrorsPlugin());
    }

    return plugins;
}

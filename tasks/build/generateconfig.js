'use strict';

const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SimpleDefinePlugin = require('simple-define-webpack-plugin');
const path = require('path');
const args = require('yargs').argv;
const stripJsonComments = require('strip-json-comments');
const fs = require('fs');
const gutil = require('gulp-util');

const SRC_DIR = path.join(__dirname, '../../src');
const DIST_DIR = path.join(__dirname, '../../dist');
const ENV_CONFIG_PATH = path.join(SRC_DIR, 'env/' + args.env + '.json');

/**
 * Generates the Webpack config.
 * @param {Object} options
 */
module.exports = function generateConfig(options) {
    options = options || {};

    const config = {
        context: SRC_DIR,
        entry: !options.omitEntry && [
            'babel-polyfill',
            './entry'
        ],
        output: !options.omitOutput && {
            path: DIST_DIR,
            filename: options.revision ? '[name].[chunkhash].js' : '[name].js'
        },
        module: {
            loaders: getLoaders(options)
        },
        resolve: {
            alias: {
                modernizr: path.join(DIST_DIR, 'modernizr.js')
            },
            root: [
                SRC_DIR
            ]
        },
        target: 'web',
        debug: !!options.debug,
        plugins: getPlugins(options, getEnvConfig(ENV_CONFIG_PATH))
    };

    if (options.sourceMaps) {
        config.devtool = typeof options.sourceMaps === 'string' ?
            options.sourceMaps : 'source-map';
    }

    return config;
};

function getEnvConfig(envConfigPath) {
    try {
        return JSON.parse(stripJsonComments(fs.readFileSync(envConfigPath, 'utf8')));
    } catch (e) {
        e.message = 'Cannot read env file: ' + envConfigPath + '\nError: ' + e.message;
        throw new gutil.PluginError('build', e);
    }
}

function getLoaders(options) {
    let loaders = [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-2']
            }
        }, {
            test: /modernizr.js$/,
            loader: 'exports-loader?window.Modernizr'
        }, {
            test: /\.(jpe?g|png|gif|svg|woff|ttf|eot)$/i,
            loader: options.staticFileNames ? 'file-loader?name=[name].[ext]' : 'url-loader?limit=10000'
        }
    ];

    if (options.optimize) {
        // Strip out all `logger` and `console` statements.
        loaders.push({
            test: /\.js$/,
            loader: 'strip-loader?strip[]=logger.*&strip[]=console.*'
        });
    }

    loaders = loaders.concat(getCssLoaders(options));

    return loaders;
}

function getCssLoaders(options) {
    let loaders = [];
    let styleLoader = 'style-loader';
    let cssLoader = 'css-loader';
    let cssModulesLoader;
    let autoprefixerLoader = 'autoprefixer-loader';
    let cssLoaders;
    let cssModulesLoaders;

    if (options.staticClassNames) {
        cssModulesLoader = 'css-loader?modules&localIdentName=[local]';
    } else if (options.optimize) {
        cssModulesLoader = 'css-loader?modules';
    } else {
        cssModulesLoader = 'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]';
    }

    if (options.sourceMaps) {
        cssLoader += '?sourceMap';
        cssModulesLoader += '&sourceMap';
    }

    cssLoaders = `${styleLoader}!${cssLoader}`;
    cssModulesLoaders = `${styleLoader}!${cssModulesLoader}!${autoprefixerLoader}`;

    if (options.extractCss) {
        cssLoaders = ExtractTextPlugin.extract(
            `${styleLoader}`,
            `${cssLoader}`
        );
        cssModulesLoaders = ExtractTextPlugin.extract(
            `${styleLoader}`,
            `${cssModulesLoader}!${autoprefixerLoader}`
        );
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

function getPlugins(options, envConfig) {
    const plugins = [
        new SimpleDefinePlugin({
            'window.env': envConfig
        })
    ];

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
        plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }));
    }

    if (options.stats) {
        plugins.push(new StatsPlugin(path.join(DIST_DIR, 'stats.json'), {
            chunkModules: true
        }));
    }

    if (options.extractCss) {
        plugins.push(new ExtractTextPlugin(options.revision ? '[name].[contenthash].css' : '[name].css', {
            allChunks: true
        }));
    }

    if (!options.disableCodeSplitting) {
        // Disable code splitting by limiting the number of chunks to 1.
        plugins.push(new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }));
    }

    return plugins;
}
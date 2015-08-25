'use strict';

var StatsPlugin = require('stats-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var SimpleDefinePlugin = require('simple-define-webpack-plugin');
var path = require('path');
var clone = require('clone');
var args = require('yargs').argv;
var stripJsonComments = require('strip-json-comments');
var fs = require('fs');
var gutil = require('gulp-util');

var srcDir = path.join(__dirname, '../../src');
var distDir = path.join(__dirname, '../../dist');
var envConfigPath = path.join(srcDir, 'env/' + args.env + '.json');
var envConfig;
var defaultConfig;

try {
    envConfig = JSON.parse(stripJsonComments(fs.readFileSync(envConfigPath, 'utf8')));
} catch (e) {
    e.message = 'Cannot read env file: ' + envConfigPath + '\nError: ' + e.message;
    throw new gutil.PluginError('build', e);
}

defaultConfig = {
    debug: true,
    devtool: 'source-map',
    context: srcDir,
    entry: './entry.js',
    target: 'web',
    output: {
        path: distDir,
        filename: 'entry.js'
    },
    resolve: {
        root: [
            srcDir
        ]
    },
    module: {
        loaders: {
            // Loaders are usually an array but instead we are using
            // an object so we can override easily in other Webpack
            // configurations.
            localCss: {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css?modules&localIdentName=[name]-[local]_[hash:base64:5]!autoprefixer'
                )
            },
            // We make the assumption that all CSS in node_modules is either
            // regular 'global' css or pre-compiled.
            globalCss: {
                test: /\.css$/,
                include: /node_modules/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css'
                )
            },
            files: {
                test: /\.(jpe?g|png|gif|svg|woff|ttf|eot)$/i,
                // Files under 10kb will become a DataUrl.
                // Anything more then this should probably be downloaded and
                // cached as its own file.
                loader: 'url?limit=10000'
            },
            js: {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel?optional[]=runtime'
            },
            // Expose 'react' to support React Developer Tools in Chrome.
            exposeReact: {
                test: require.resolve('react'),
                loader: 'expose?React'
            }
        }
    },
    plugins: {
        // Plugins are usually an array but instead we are using
        // an object so we can override easily in other Webpack
        // configurations.
        stats: new StatsPlugin(path.join(distDir, 'stats.json'), {
            chunkModules: true
        }),
        extractCss: new ExtractTextPlugin('[name].css', {
            allChunks: true
        }),
        env: new SimpleDefinePlugin({
            'window.env': envConfig
        })
    }
};

/**
 * Maps an object into an array
 * @param  {Object} obj The object to convert
 * @return {Array}      The resulting array mapped from obj
 */
function map(obj) {
    return Object.keys(obj).map(function(k) {
        return obj[k];
    });
}

/**
 * Converts a modified Webpack config into a Webpack compatible
 * one by mapping `loaders` and `plugins` into arrays.
 * @param  {Object} config A `modified` Webpack config
 * @return {Object}        A Webpack compatible config
 */
function convert(config) {
    config = clone(config);
    config.plugins = map(config.plugins);
    config.module.loaders = map(config.module.loaders);
    return config;
}

// The default exports is a converted and Webpack ready
// `webpack.default.config.js`.
module.exports = convert(defaultConfig);

// Export the conversion function.
module.exports.convert = convert;

// Export the raw and unconverted `webpack.default.config.js`.
module.exports.defaultConfig = defaultConfig;

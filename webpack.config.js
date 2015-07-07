var StatsPlugin = require('stats-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path'),
    clone = require('clone');

var defaultConfig = {
    debug: true,
    devtool: 'source-map',
    context: path.join(__dirname, 'src'),
    entry:  './entry.js',
    target: 'web',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'entry.js'
    },
    resolve: {
        root: [
            path.join(__dirname, 'src')
        ]
    },
    module: {
        loaders: {
            // Loaders are usually an array but instead we are using
            // an object so we can override easily in other Webpack
            // configurations.
            extract: {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css?modules&localIdentName=[name]-[local]_[hash:base64:5]!autoprefixer'
                )
            },
            fileLoader: {
                test: /\.(jpe?g|png|gif|svg|woff|ttf|eot)$/i,
                // Files under 10kb will become a DataUrl.
                // Anything more then this should probabaly be downloaded and
                // cached as its own file.
                loader: 'url?limit=10000'
            },
            babel: {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        }
    },
    plugins: {
        // Plugins are usually an array but instead we are using
        // an object so we can override easily in other Webpack
        // configurations.
        stats: new StatsPlugin(path.join(__dirname, 'dist', 'stats.json'), {
            chunkModules: true
        }),
        extract: new ExtractTextPlugin('[name].css', {
            allChunks: true
        })
    }
};

/**
 * Maps an object into an array
 * @param  {Object} obj The object to convert
 * @return {Array}      The resulting array mapped from obj
 */
var map = function(obj) {
    return Object.keys(obj).map(function(k) {
        return obj[k];
    });
};

/**
 * Converts a modified Webpack config into a Webpack compatible
 * one by mapping `loaders` and `plugins` into arrays.
 * @param  {Object} config A `modified` Webpack config
 * @return {Object}        A Webpack compatible config
 */
var convert = function(config) {
    config = clone(config);
    config.plugins = map(config.plugins);
    config.module.loaders = map(config.module.loaders);
    return config;
};

// The default exports is a converted and Webpack ready
// `webpack.default.config.js`.
module.exports = convert(defaultConfig);

// Export the conversion function.
module.exports.convert = convert;

// Export the raw and unconverted `webpack.default.config.js`.
module.exports.defaultConfig = defaultConfig;
'use strict';

var webpackConfig = require('../build/webpack.test.config');
var path = require('path');
var args = require('yargs')
    .default('ci', false)
    .argv;

module.exports = function(config) {

    config.set({

        // Base path that will be used to resolve all patterns (eg. files, exclude).
        basePath: path.resolve(__dirname, '../../src'),

        // Frameworks to use.
        // Available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // List of files / patterns to load in the browser.
        files: [
            '*.test.js',
            '**/*.test.js'
        ],

        // List of files to exclude.
        exclude: [],

        // Preprocess matching files before serving them to the browser.
        // Available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '*.test.js': ['webpack', 'sourcemap'],
            '**/*.test.js': ['webpack', 'sourcemap']
        },

        // Webpack test config.
        webpack: webpackConfig,

        // 'webpack-dev-middleware' config.
        webpackMiddleware: {
            stats: {
                colors: true
            }
        },

        // Test results reporter to use.
        // Possible values: 'dots', 'progress'.
        // Available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots'],

        // Web server port.
        port: 9876,

        // Enable / disable colors in the output (reporters and logs).
        colors: true,

        // Level of logging.
        // Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Enable / disable watching file and executing tests whenever any file changes.
        autoWatch: true,

        // Start these browsers.
        // Available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            'Chrome'
        ],

        // Continuous Integration mode.
        // If true, Karma captures browsers, runs the tests and exits.
        singleRun: !args.ci,

        plugins: [
            require('karma-webpack'),
            require('karma-sourcemap-loader'),
            require('karma-jasmine'),
            require('karma-chrome-launcher')
        ]

    });

};

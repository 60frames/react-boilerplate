'use strict';

var webpackConfig = require('../build/webpack.test.config');
var path = require('path');
var args = require('yargs')
    .default('ci', false)
    .argv;

module.exports = function(config) {

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: path.resolve(__dirname, '../../src'),

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            '*.test.js',
            '**/*.test.js'
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '*.test.js': ['webpack', 'sourcemap'],
            '**/*.test.js': ['webpack', 'sourcemap']
        },

        // webpack test config
        webpack: webpackConfig,

        // webpack-dev-middleware config
        webpackMiddleware: {
            stats: {
                colors: true
            }
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // TODO: should we provide a argument to choose the browser as I can imagine
        // phantom being best for tdd / ci but chrome being better if you need to
        // debug?
        browsers: [
            'Chrome'
            // 'PhantomJS' // TODO
        ],

        // have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
        // phantomjsLauncher: {
        //     exitOnResourceError: true
        // },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: !args.ci,

        plugins: [
            require('karma-webpack'),
            require('karma-sourcemap-loader'),
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-phantomjs-launcher')
        ]

    });

};

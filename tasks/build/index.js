'use strict';

const path = require('path');
const async = require('async');
const fs = require('fs-extra');
const webpack = require('webpack');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const config = require('./webpack.release.config');

const SRC_DIR = config[0].context;
const DIST_DIR = config[0].output.path;

/**
 * Cleans the dist directory ready for a new build.
 */
function clean(done) {
    fs.remove(DIST_DIR, done);
}

/**
 * Copies static assets from /src/public -> /dist. i.e. favicon.ico, robots.txt etc.
 */
function copy(done) {
    fs.copy(path.join(SRC_DIR, 'public'), DIST_DIR, done);
}

/**
 * Bundles app with Webpack.
 */
function build(done) {
    const compiler = webpack(config);
    compiler.apply(new ProgressBarWebpackPlugin());
    compiler.run((err, stats) => {
        if (err) {
            throw err;
        }
        const output = stats.toString({
            colors: true,
            modules: true,
            cached: false,
            cachedAssets: false,
            errorDetails: false,
            chunkOrigins: false,
            exclude: ['node_modules']
        });
        console.log(output); // eslint-disable-line no-console
        done();
    });
}

async.series([
    clean,
    done => {
        async.parallel([
            copy,
            build
        ], done);
    }
], err => {
    if (err) {
        throw err;
    }
});

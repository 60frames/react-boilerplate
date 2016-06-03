'use strict';

const path = require('path');
const async = require('async');
const fs = require('fs-extra');
const webpack = require('webpack');
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
 * Copies static assets from /app -> /dist. i.e. favicon.ico, robots.txt etc.
 */
function copy(done) {
    async.parallel([
        'favicon.ico',
        'apple-touch-icon.png',
        'browserconfig.xml',
        'robots.txt',
        'tile-wide.png',
        'tile.png'
    ]
    .map(file => path.join(SRC_DIR, file))
    .map(filePath => fs.copy.bind(fs, filePath, path.join(DIST_DIR, path.basename(filePath)))), done);
}

/**
 * Bundles app with Webpack.
 */
function build(done) {
    webpack(config, (err, stats) => {
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
        /* eslint-disable no-console */
        console.log(output);
        /* eslint-enable no-console */
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

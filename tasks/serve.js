/* eslint-disable no-process-env */

'use strict';

var gulp = require('gulp');
var fork = require('child_process').fork;
var objectAssign = require('object-assign');
var args = require('yargs').argv;

/**
 * Starts the server.
 * @return {undefined} undefined
 */
function serve() {
    var env = {};

    // Only add to `env` if is a truthy value otherwise
    // it will turn it into a truthy string in `process.env`.
    if (args.livereload) {
        // Forces the server to use the livereload middleware
        env.LIVERELOAD = args.livereload;
    }

    fork('./server/server.js', {
        env: objectAssign(env, process.env)
    });
}

gulp.task('serve', serve);

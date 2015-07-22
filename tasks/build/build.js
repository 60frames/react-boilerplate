'use strict';

var gulp = require('gulp');
var args = require('yargs').argv;
var exec = require('child_process').exec;
var del = require('del');

var CONFIGS = {
    dev: './tasks/build/webpack.config.js',
    prod: './tasks/build/webpack.release.config.js'
};

/**
 * Deletes the contents of the dist directory.
 * @param  {Function} done callback.
 * @return {undefined}     undefined.
 */
function clean(done) {
    del('dist/**', done);
}

// TODO: switch out for webpack node api.
function build(done) {
    var cmd = 'webpack --config=' + CONFIGS[args.env];
    exec(cmd, function(error, stdout, stderr) {
        console.log(error);
        console.log(stdout);
        console.log(stderr);
        done();
    });
}

gulp.task('build', gulp.series(clean, build));

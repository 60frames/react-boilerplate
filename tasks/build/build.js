'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var webpack = require('webpack');
var args = require('yargs')
    .default('watch', false)
    .argv;

args.watch = args.watch === true ? 300 : args.watch;

/**
 * Deletes the contents of the dist directory.
 * @param  {Function} done callback.
 * @return {undefined}     undefined.
 */
function clean(done) {
    del('dist/**', done);
}

/**
 * Builds the application by running an
 * environment config through Webpack.
 * @param  {Function} done callback
 * @return {undefined}     undefined
 */
function build(done) {
    var config = require(args.release ? './webpack.release.config.js' : './webpack.config.js');
    var compiler = webpack(config);
    var watcher;

    /**
     * Webpacks complete callback
     * @param  {Object} err   Webpacks error object
     * @param  {Object} stats Webpacks build statistics
     * @return {undefined}    undefined
     */
    function webpackCallback(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack:build', err);
        }
        gutil.log(stats.toString({
            colors: true
        }));
        done();

        if (args.watch) {
            gutil.log(gutil.colors.cyan('Watching for changes with a ' +
                args.watch + 'ms timeout.'));
        }
    }

    if (args.watch) {
        watcher = compiler.watch(args.watch, webpackCallback);
    } else {
        compiler.run(webpackCallback);
    }

    process.on('SIGINT', function() {
        if (args.watch) {
            watcher.close(function() {
                gutil.log(gutil.colors.red('Stopped watching.'));
            });
        }
    });
}

gulp.task('build', gulp.series(clean, build));

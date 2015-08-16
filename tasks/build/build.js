'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var webpack = require('webpack');
var args = require('yargs').argv;

var watch = 'watch' in args;
var watchTimeout = typeof args.watch === 'number' ? args.watch : 300;

/**
 * Deletes the contents of the dist directory.
 * @param  {Function} done callback.
 * @return {undefined}     undefined.
 */
function clean(done) {
    del('dist/**', done);
}

/**
 * Copies files in `src` to `dist` directory.
 * @return {Stream} File stream.
 */
function copy() {
    return gulp.src([
            // Filenames in `src`
            'favicon.ico',
            'apple-touch-icon.png',
            'browserconfig.xml',
            'robots.txt',
            'tile-wide.png',
            'tile.png'
        ], {
            cwd: 'src'
        })
        .pipe(gulp.dest('dist/'));
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
            throw new gutil.PluginError('build', err);
        }
        gutil.log(stats.toString({
            colors: true
        }));
        done();

        if (watch) {
            gutil.log(gutil.colors.cyan('Watching for changes with a ' +
                watchTimeout + 'ms timeout.'));
        }
    }

    if (watch) {
        watcher = compiler.watch(watchTimeout, webpackCallback);
    } else {
        compiler.run(webpackCallback);
    }

    process.on('SIGINT', function() {
        if (watch) {
            watcher.close(function() {
                gutil.log(gutil.colors.red('Stopped watching.'));
            });
        }
    });
}

gulp.task('build', gulp.series(
    clean,
    gulp.parallel(
        build, copy
    )
));

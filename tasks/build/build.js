'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var modernizr = require('gulp-modernizr');
var del = require('del');
var webpack = require('webpack');
var args = require('yargs')
    .argv;
var modernizrAllConfig = require('modernizr/lib/config-all.json');

var watch = 'watch' in args || 'livereload' in args;
var watchTimeout = args.watch || args.livereload;
watchTimeout = typeof watchTimeout === 'number' ? watchTimeout : 300;

/**
 * Deletes the contents of the dist directory.
 * @param  {Function} done callback.
 * @return {undefined}     undefined.
 */
function clean(done) {
    del('dist/**', done);
}

/**
 * Modernizr build
 * @return {undefined}    undefined.
 */
function modernize() {
    var options = {
        // Modernizr config will only include tests it needs.
        // All Modernizr tests are overidden below when developing.
        // https://github.com/doctyper/customizr
        options: [
            'setClasses'
        ]
    };

    if (!args.release) {
        // All the tests!
        options.tests = modernizrAllConfig['feature-detects'];
        // TODO: Ideally we would include all the `options` as well
        // but there is an issue with html5shiv.
        // https://github.com/Modernizr/Modernizr/issues/1431
        // options.options = modernizrAllConfig.options;
    }

    return gulp.src(['./src/**/*.{js,css}'])
        .pipe(modernizr(options))
        .pipe(gulp.dest('dist'));
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
    var callbackCount = 0;

    /**
     * Webpacks complete callback
     * @param  {Object} err   Webpacks error object
     * @param  {Object} stats Webpacks build statistics
     * @return {undefined}    undefined
     */
    function webpackCallback(err, stats) {
        var jsonStats = stats.toJson();

        if (err) {
            throw new gutil.PluginError('build', err);
        }

        done();

        if (!callbackCount) {
            // This runs on first build only.
            gutil.log(stats.toString({
                colors: true
            }));
            if (watch) {
                if (args.livereload) {
                    livereload.listen();
                    gutil.log(gutil.colors.cyan('Live reload server started.'));
                }
                gutil.log(gutil.colors.cyan('Watching for changes with a ' +
                    watchTimeout + 'ms timeout.'));
            }
        } else {
            // This runs after the first build when `--watch`ing
            jsonStats.errors.forEach(function(e) {
                gutil.log(gutil.colors.red(e));
            });

            jsonStats.warnings.forEach(function(e) {
                gutil.log(gutil.colors.yellow(e));
            });

            if (!jsonStats.errors.length && !jsonStats.warnings.length) {
                gutil.log(gutil.colors.grey('File changed succesfully.'));
                if (livereload.server) {
                    // Live reload only if no errors or warnings in build
                    livereload.changed('app');
                }
            }
        }

        callbackCount++;
    }

    if (watch) {
        compiler.watch(watchTimeout, webpackCallback);
    } else {
        compiler.run(webpackCallback);
    }
}

gulp.task('build', gulp.series(
    clean,
    modernize,
    gulp.parallel(
        build, copy
    )
));

'use strict';

var gulp = require('gulp');
var modernizr = require('gulp-modernizr');
var modernizrAllConfig = require('modernizr/lib/config-all.json');
var args = require('yargs').argv;

/**
 * Creates a custom Modernizr build based on tests used in source code.
 * @return {stream} File stream.
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

module.exports = modernize;

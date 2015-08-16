'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

/**
 * Runs eslint.
 * @return {Stream} File stream.
 */
function lint() {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
}

gulp.task('lint', lint);

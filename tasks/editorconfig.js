'use strict';

var gulp = require('gulp');

/**
 * Copies `.editorconfig` from the 'coding-standards' module.
 * @return {stream} File stream.
 */
function copy() {
    return gulp.src('node_modules/coding-standards/.editorconfig')
        .pipe(gulp.dest(''));
}

gulp.task('editorconfig', copy);

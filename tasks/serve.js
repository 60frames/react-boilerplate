'use strict';

var gulp = require('gulp');
var fork = require('child_process').fork;

/**
 * Starts the server.
 * @return {undefined} undefined
 */
function serve() {
    var child = fork('./server/server.js');
    process.on('SIGINT', function() {
        child.kill();
    });
}

gulp.task('serve', serve);

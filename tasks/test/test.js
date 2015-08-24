'use strict';

var gulp = require('gulp');
var Server = require('karma').Server;
var path = require('path');

/**
 * Starts up the Karma server.
 * @param  {Function} done Callback.
 * @return {Undefined}     Undefined.
 */
function test(done) {
    new Server({
        configFile: path.resolve(__dirname, './karma.conf.js')
    }, done).start();
}

gulp.task('test', test);

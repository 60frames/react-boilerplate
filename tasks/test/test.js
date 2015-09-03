'use strict';

var gulp = require('gulp');
var Server = require('karma').Server;
var path = require('path');
var modernize = require('../modernize');

/**
 * Starts up the Karma server.
 * @param  {function} done Callback.
 * @return {undefined}     Undefined.
 */
function test(done) {
    new Server({
        configFile: path.resolve(__dirname, './karma.conf.js')
    }, done).start();
}

gulp.task('test', gulp.series(modernize, test));

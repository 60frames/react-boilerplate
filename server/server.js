'use strict';

// Load config first as it sets process.env for
// other dependencies to use.
var config = require('./config');
var path = require('path');
var express = require('express');
var ms = require('ms');
var compression = require('compression');
var morgan = require('morgan');
var fs = require('fs');
var livereload = require('connect-livereload');
var debug = require('debug')('app');
var colors = require('colors/safe');
var app = express();
var entry = require('./../dist/entryServer');
var stats = require('./../dist/stats');

/**
 * Set app settings
 */
app.set('port', config.PORT || 6060);

/**
 * Middleware
 */
if (config.LIVERELOAD) {
    debug('Livereload middleware active');
    app.use(livereload());
}

app.use(compression());

app.use(express.static(path.join(__dirname, '../dist'), {
    maxAge: ms(config.BROWSER_CACHE || 0)
}));

if (config.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined', {
        stream: fs.createWriteStream(
            path.join(__dirname, '/log/access.log')
        )
    }));
}

app.use(function(req, res, next) {
    entry(req, res, next, stats);
});

/**
 * Start listening
 */
app.listen(app.get('port'), function() {
    debug(colors.cyan('Server started: ') +
        'http://localhost:' + app.get('port'));
    debug(colors.grey('Press \'ctrl + c\' to terminate server'));
});

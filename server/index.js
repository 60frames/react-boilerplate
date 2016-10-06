'use strict';

const express = require('express');
const compression = require('compression');
const debug = require('debug')('app');
const colors = require('colors/safe');
const api = require('./routes/api');
const app = express();

app.set('port', process.env.PORT);

app.use(compression());

app.use('/api', api);

if (process.env.WEBPACK_DEV_SERVER === 'true') {
    app.use(require('./routes/webpack'));
} else {
    app.use(require('./routes/static'));
}

if (process.env.NODE_ENV === 'development') {
    const errorhandler = require('errorhandler');
    errorhandler.title = '¯\\_(ツ)_/¯';
    app.use(errorhandler());
}

app.listen(app.get('port'), () => {
    debug(colors.white(`Server started: http://localhost:${app.get('port')}`));
    debug(colors.grey('Press \'ctrl + c\' to terminate server'));
});

'use strict';

const config = require('./config');
const path = require('path');
const express = require('express');
const ms = require('ms');
const compression = require('compression');
const fs = require('fs');
const debug = require('debug')('app');
const colors = require('colors/safe');
const api = require('./routes/api');
const app = express();

app.set('port', config.PORT || 6060);

app.use(compression());

app.use('/api', api);

if (config.WEBPACK_DEV_SERVER === 'true') {
    app.use(require('./routes/webpack'));
} else {
    app.use(require('./routes/static'));
}

app.listen(app.get('port'), () => {
    debug(`Server started: http://localhost:${app.get('port')}`);
    debug(colors.grey('Press \'ctrl + c\' to terminate server'));
});

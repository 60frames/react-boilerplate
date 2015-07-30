/* eslint-disable no-process-env, no-console */
var path = require('path');
var fs = require('fs');
var objectAssign = require('object-assign');
var dotenv = require('dotenv');
var envPath = path.join(__dirname, './.env');
var colors = require('colors/safe');

// The absence of a NODE_ENV suggests we are running locally
// and not in a deployed environment so we load the local .env file.
if (!process.env.NODE_ENV) {
    try {
        fs.statSync(envPath);
        dotenv.load({
            path: envPath
        });
    } catch(e) {
        throw new Error(colors.red('`' + envPath + '` does not exist.' +
            ' Try renaming the `_env` file.'));
    }
}

/**
 * A copy of process.env
 * @type {Object}
 */
module.exports = objectAssign({}, process.env);

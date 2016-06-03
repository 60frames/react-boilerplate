'use strict';

const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const colors = require('colors/safe');

const ENV_PATH = path.join(__dirname, './.env');

// The absence of a NODE_ENV suggests we are running locally
// and not in a deployed environment so we load the local .env file.
if (!process.env.NODE_ENV) {
    try {
        fs.statSync(ENV_PATH);
        dotenv.load({
            path: ENV_PATH
        });
    } catch (e) {
        throw new Error(colors.red(`${ENV_PATH} does not exist.
            Try renaming the '_env' file.`));
    }
}

/**
 * A copy of process.env
 * @type {Object}
 */
module.exports = Object.assign({}, process.env);

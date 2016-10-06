'use strict';

const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const colors = require('colors/safe');

const DOT_ENV_PATH = path.join(__dirname, '.env');
const UNDER_ENV_PATH = path.join(__dirname, '_env');

// The absence of a NODE_ENV suggests we are running locally
// and not in a deployed environment so we load the local .env file.
if (!process.env.NODE_ENV) {
    try {
        fs.statSync(DOT_ENV_PATH);
        dotenv.load({
            path: DOT_ENV_PATH
        });
        // Require 'debug' after env has been setup to ensure it takes into
        // account `process.env.DEBUG`.
        require('debug')('app')(colors.yellow('Using environment variables from `.env`'));

    } catch (e) {
        throw new Error(colors.red(`${DOT_ENV_PATH} does not exist.
            Try renaming the '_env' file.`));
    }
}

// `./_env` is considered a definitive list of required environment variables
const missingVars = Object.keys(
    dotenv.parse(fs.readFileSync(UNDER_ENV_PATH))
).filter(key => !process.env[key]);

if (missingVars.length) {
    throw new Error(
        colors.red(`Missing required environment variable(s): ${missingVars.join(', ')}`)
    );
}

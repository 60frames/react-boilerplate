'use strict';

const config = require('../config');
const express = require('express');
const path = require('path');
const ms = require('ms');

const DIST_DIR = path.join(__dirname, '../../dist');
const UNIVERSAL_RENDERER_PATH = path.join(DIST_DIR, 'server.js');
const CLIENT_STATS_PATH = path.join(DIST_DIR, 'stats.json');
const router = express.Router();

let universalRenderer;
let stats;

try {
    universalRenderer = require(UNIVERSAL_RENDERER_PATH).default;
} catch (ex) {
    throw new Error('Server bundle not found. Try running `npm run build`');
}

try {
    stats = require(CLIENT_STATS_PATH);
} catch (ex) {
    throw new Error('Client bundle stats.json not found. Try running `npm run build`');
}

router.use(express.static(DIST_DIR, {
    maxAge: ms(config.BROWSER_CACHE || 0)
}));

router.use(universalRenderer(stats));

module.exports = router;

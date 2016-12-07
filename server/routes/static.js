'use strict';

const express = require('express');
const path = require('path');
const ms = require('ms');

const DIST_DIR = path.join(__dirname, '../../dist');
const SERVER_RENDERER_PATH = path.join(DIST_DIR, 'server.js');
const CLIENT_STATS_PATH = path.join(DIST_DIR, 'stats.json');
const router = express.Router();

let serverRenderer;
let stats;

try {
    serverRenderer = require(SERVER_RENDERER_PATH).default;
} catch (ex) {
    throw new Error('Server bundle not found. Try running `npm run build`');
}

try {
    stats = require(CLIENT_STATS_PATH);
} catch (ex) {
    throw new Error('Client bundle stats.json not found. Try running `npm run build`');
}

router.use(express.static(DIST_DIR, {
    maxAge: ms(process.env.BROWSER_CACHE || 0)
}));

router.use(serverRenderer(stats));

module.exports = router;

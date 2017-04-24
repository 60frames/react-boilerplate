'use strict';

const express = require('express');
const path = require('path');
const ms = require('ms');

const DIST_DIR = path.join(__dirname, '../../dist');
const SERVER_RENDERER_PATH = path.join(DIST_DIR, 'server.js');
const STATS_PATH = path.join(DIST_DIR, 'client-stats.json');
const router = express.Router();

let serverRenderer;
let stats;

try {
  serverRenderer = require(SERVER_RENDERER_PATH).default;
} catch (ex) {
  throw new Error(
    `Server bundle not found at ${SERVER_RENDERER_PATH}. Try running \`npm run build\``
  );
}

try {
  stats = require(STATS_PATH);
} catch (ex) {
  throw new Error(
    `Client stats not found at ${STATS_PATH}. Try running \`npm run build\``
  );
}

router.use(
  express.static(DIST_DIR, {
    maxAge: ms(process.env.BROWSER_CACHE || 0)
  })
);

router.use(
  serverRenderer({
    clientStats: stats
  })
);

module.exports = router;

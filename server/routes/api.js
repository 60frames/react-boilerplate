'use strict';

const express = require('express');
const router = express.Router();

router.get('/posts', (req, res) => {
    res.json([
        {
            id: 60,
            title: 'Hello World',
            slug: 'hello-world',
            markdown: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    ]);
});

module.exports = router;

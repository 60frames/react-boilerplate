'use strict';

// Default args used by two or more tasks.
require('yargs')
    .default('release', false);

require('./tasks/lint');
require('./tasks/build/build');

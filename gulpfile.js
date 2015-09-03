'use strict';

// Default args used by two or more tasks.
require('yargs')
    .default('env', 'dev')
    .default('release', false);

require('./tasks/lint');
require('./tasks/editorconfig');
require('./tasks/build/build');
require('./tasks/serve');
require('./tasks/test/test');

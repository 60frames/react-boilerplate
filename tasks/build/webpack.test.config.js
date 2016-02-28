'use strict';

const generateConfig = require('./generateconfig');

module.exports = generateConfig({
	// Entry and output are configured by 'karma-webpack' in 'karma.conf.js'.
	omitEntry: true,
	omitOutput: true,
	debug: true,
	sourceMaps: 'inline-source-map',
	disableCodeSplitting: true,
	staticFileNames: true,
	staticClassNames: true
});

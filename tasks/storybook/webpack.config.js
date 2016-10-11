'use strict';

const generateConfig = require('../build/generateConfig');

module.exports = (storybookBaseConfig, configType) => {
    let options;
    if (configType === 'DEVELOPMENT') {
        options = {
            sourceMaps: true
        };
    } else {
        options = {
            optimize: true,
            revision: true
            // extractCss: true,
            // stats: true
        }
    }

    const config = generateConfig(options);

    // Copy over app loader and resolve config.
    storybookBaseConfig.module = config.module;
    storybookBaseConfig.resolve = config.resolve;
    // storybookBaseConfig.plugins = config.plugins; Prob not a good idea to try
    // and use plugins from app config as it includes things specific to app entry
    // e.g. HotReloading requires the client to be injected etc.
    return storybookBaseConfig;
};

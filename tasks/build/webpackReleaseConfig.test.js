/* eslint-env jest */

const webpackReleaseConfig = require('./webpackReleaseConfig');
const webpackConfigSnapshotSerializer = require('../../test/webpackConfigSnapshotSerializer');

describe('tasks/build/webpackReleaseConfig', () => {
  expect.addSnapshotSerializer(webpackConfigSnapshotSerializer);

  describe('client config', () => {
    it('has not regressed', () => {
      const config = webpackReleaseConfig.find(
        config => config.name === 'client'
      );
      expect(config).toBeDefined();
      expect({
        __webpack_config__: config
      }).toMatchSnapshot();
    });
  });

  describe('server config', () => {
    it('has not regressed', () => {
      const config = webpackReleaseConfig.find(
        config => config.name === 'server'
      );
      expect(config).toBeDefined();
      delete config.externals; // Reduce noise from node_modules
      expect({
        __webpack_config__: config
      }).toMatchSnapshot();
    });
  });
});

const rootDirname = require('../root').rootDirname;

/**
 * Strips out path specific output from webpack config snapshots.
 * i.e. /Users/Rich/Projects/react-boilerplate/src -> <rootDir>/src
 *
 * e.g.
 * expect.addSnapshotSerializer(webpackConfigSnapshotSerializer);
 * expect({ __webpack_config__: config }).toMatchSnapshot();
 *
 * NOTE: Ideally we'd just mock `__dirname` when testing Webpack configs,
 * however jest doesn't offer a way to do it.
 */

const print = (val, serialize) => {
  const snapshot = serialize(val.__webpack_config__);
  const rootDirnameRegex = new RegExp(rootDirname, 'g');
  return snapshot.replace(rootDirnameRegex, '<rootDir>');
};

const test = val => !!val.__webpack_config__;

module.exports = {
  print,
  test
};

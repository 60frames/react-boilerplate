import { rootDirname } from '../root';

/**
 * Ideally we'd just mock `__dirname` when testing Webpack configs, however
 * jest doesn't offer a way to do it, so stripping path specific output from
 * the snapshot here instead.
 * i.e. /Users/Rich/Projects/react-boilerplate/src -> <rootDir>/src
 * e.g. expect({ __webpack_config__: config }).toMatchSnapshot();
 */

const print = (val, serialize) => {
    const snapshot = serialize(val.__webpack_config__);
    const rootDirnameRegex = new RegExp(rootDirname, 'g');
    return snapshot.replace(rootDirnameRegex, '<rootDir>');
};

const test = (val) => !!val.__webpack_config__;

export default {
    print,
    test
};

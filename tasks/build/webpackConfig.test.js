import { rootDirname } from '../../root';
import webpackConfig from './webpackConfig';
import webpackConfigSnapshotSerializr from '../../test/webpackConfigSnapshotSerializer';

describe('tasks/build/webpackConfig', () => {
    expect.addSnapshotSerializer(webpackConfigSnapshotSerializr);

    describe('client config', () => {
        it('has not regressed', () => {
            const config = webpackConfig.find(config => config.name === 'client');
            expect(config).toBeDefined();
            expect({
                __webpack_config__: config
            }).toMatchSnapshot();
        });
    });

    describe('server config', () => {
        it('has not regressed', () => {
            const config = webpackConfig.find(config => config.name === 'server');
            expect(config).toBeDefined();
            delete config.externals; // Reduce noise from node_modules
            expect({
                __webpack_config__: config,
            }).toMatchSnapshot();
        });
    });
});

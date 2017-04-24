/* eslint-env jest, commonjs */

const ReactRouter = jest.genMockFromModule('react-router');
ReactRouter.Router = 'Router';
ReactRouter.Link = 'Link';
module.exports = ReactRouter;

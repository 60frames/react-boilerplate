/* global jest */
/* eslint-env node */

const ReactRouter = jest.genMockFromModule('react-router');
ReactRouter.Router = 'Router';
module.exports = ReactRouter;

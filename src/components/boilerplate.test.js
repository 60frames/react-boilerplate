/* eslint-env jasmine */
/* global jest, require */

jest.dontMock('./boilerplate.js');
jest.mock('./boilerplate.css');

// Cannot use ES6 imports as they are hoisted above `jest.dontMock`
// https://github.com/babel/babel-jest/issues/16
var Boilerplate = require('./boilerplate.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('boilerplate', function() {

    var component;

    beforeEach(function() {
        component = TestUtils.renderIntoDocument(
            <Boilerplate />
        );
    });

    it('has a h1 title', function() {
        var title = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
        expect(title.getDOMNode().textContent).toEqual('react-boilerplate');
    });

    it('has a paragraph with descriptive text', function() {
        var paragraph = TestUtils.findRenderedDOMComponentWithTag(component, 'p');
        expect(paragraph.getDOMNode().textContent).toEqual('A React and Webpack boilerplate.');
    });

});

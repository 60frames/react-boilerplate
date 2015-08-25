/* eslint-env jasmine */

import Index from './index.js';
import React from 'react/addons';

let TestUtils = React.addons.TestUtils;

describe('components/index/index', () => {

    let component;

    beforeEach(() => {
        component = TestUtils.renderIntoDocument(
            <Index />
        );
    });

    it('has a description', () => {
        let description = TestUtils.findRenderedDOMComponentWithClass(component, 'description');
        expect(description.getDOMNode().textContent).toBe('A React and Webpack boilerplate.Environment: development');
    });

    it('has a logo', () => {
        let logo = TestUtils.findRenderedDOMComponentWithClass(component, 'logo');
        expect(logo).toBeDefined();
    });

    it('has a second logo', function() {
        let logo = TestUtils.findRenderedDOMComponentWithTag(component, 'img');
        expect(logo.getDOMNode().src).toContain('react-logo.png');
    });

    describe('test isolation', () => {

        it('can break React.addons without affecting other test files', () => {
            expect(React.addons).toBeDefined();
            delete React.addons;
            expect(React.addons).toBeUndefined();
        });

    });

});

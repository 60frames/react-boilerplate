/* eslint-env jasmine */

import Four04 from './four04.js';
import React from 'react/addons';

let TestUtils = React.addons.TestUtils;

describe('components/four04/four04', () => {

    let component;

    beforeEach(() => {
        component = TestUtils.renderIntoDocument(
            <Four04 />
        );
    });

    it('has a title', () => {
        let title = TestUtils.findRenderedDOMComponentWithClass(component, 'title');
        expect(title.getDOMNode().textContent).toBe('404');
    });

    it('has a paragraph with descriptive text', () => {
        let paragraph = TestUtils.findRenderedDOMComponentWithClass(component, 'text');
        expect(paragraph.getDOMNode().textContent).toEqual('Oops, looks like this does not exist.');
    });

    describe('test isolation', () => {

        it('can break React.addons without affecting other test files', () => {
            expect(React.addons).toBeDefined();
            delete React.addons;
            expect(React.addons).toBeUndefined();
        });

    });

});

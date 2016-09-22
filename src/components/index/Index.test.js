/* eslint-env jasmine */

import React from 'react';
import renderer from 'react-test-renderer';
import Index from './Index';

describe('components/index/Index', () => {

    it('renders correctly', () => {
        const component = renderer.create(
            <Index />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});

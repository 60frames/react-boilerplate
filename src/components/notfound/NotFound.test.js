/* eslint-env jasmine */

import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from 'components/notfound/NotFound';

describe('components/notfound/NotFound', () => {

    it('renders correctly', () => {
        const component = renderer.create(
            <NotFound />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});

/* eslint-env jasmine */

import React from 'react';
import renderer from 'react-test-renderer';
import Button from 'components/lib/button/Button';

describe('components/lib/button/Button', () => {

    it('renders correctly', () => {
        const component = renderer.create(
            <Button onClick={() => {}}>
                Hello Button.
            </Button>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});

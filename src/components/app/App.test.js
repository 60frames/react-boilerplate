/* global jest */
/* eslint-env jasmine */

jest.mock('react-helmet', () => 'Helmet');

import React from 'react';
import renderer from 'react-test-renderer';
import { App } from 'components/app/App';

describe('components/app/App', () => {

    it('renders correctly', () => {
        const component = renderer.create(
            <App dispatch={jest.fn()}>
                Hello world.
            </App>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});

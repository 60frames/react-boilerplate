/* global jest */
/* eslint-env jasmine */

jest.mock('react-redux');
jest.mock('react-router');
jest.mock('routes', () => 'routes');

import React from 'react';
import renderer from 'react-test-renderer';
import Root from 'components/root/Root';

describe('components/root/Root', () => {

    it('renders correctly', () => {
        const component = renderer.create(
            <Root
                store={{
                    store: 'store'
                }}
                history={{
                    history: 'history'
                }} />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});

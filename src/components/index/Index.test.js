/* global jest */
/* eslint-env jasmine */

import React from 'react';
import renderer from 'react-test-renderer';
import { Index } from 'components/index/Index';

describe('components/index/Index', () => {

    it('renders a quote', () => {
        const component = renderer.create(
            <Index value="A quote" dispatch={jest.fn()} />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders a loading indicator', () => {
        const component = renderer.create(
            <Index isFetching={true} dispatch={jest.fn()} />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders an error', () => {
        const component = renderer.create(
            <Index error="An error" dispatch={jest.fn()} />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});

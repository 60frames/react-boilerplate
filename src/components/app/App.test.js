/* eslint-env jest */

jest.mock('react-helmet', () => 'Helmet');
jest.mock('react-router');

import React from 'react';
import renderer from 'react-test-renderer';
import App from 'components/app/App';

describe('components/app/App', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <App>
        Hello world.
      </App>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

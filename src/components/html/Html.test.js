/* eslint-env jasmine */

import React from 'react';
import renderer from 'react-test-renderer';
import Html from 'components/html/Html';

describe('components/html/Html', () => {

    it('renders correctly', () => {
        process.env.API_ENDPOINT = 'http://localhost:6060/api';
        process.env.REDUX_LOGGER = 'true';
        const component = renderer.create(
            <Html
                css="https://60fram.es/bundle.css"
                js="https://60fram.es/bundle.js"
                html={`
                    <div id="root">
                        Hello World.
                    </div>
                `}
                head={{
                    title: {
                        toComponent: () => '<title>title</title>'
                    },
                    meta: {
                        toComponent: () => '<meta />'
                    },
                    link: {
                        toComponent: () => '<link />'
                    }
                    }}
                initialState={{
                    initial: 'state'
                }} />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});

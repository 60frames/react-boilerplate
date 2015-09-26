# react-boilerplate

A SPA boilerplate built using Webpack, React, Express, ES6+ transpiled with Babel and tested with Karma and Jasmine.

## Quick start

- `git clone https://github.com/60frames/react-boilerplate`
- `cd react-boilerplate`
- `npm install -g git+ssh://git@github.com:gulpjs/gulp.git#4.0`
- `npm install`
- `npm start`

## Gulp tasks

#### `gulp build`

Builds the application into the `dist` directory with Webpack.

##### `--release`

Builds using the release Webpack config. Minifies source and builds a Modernizr release.

##### `--watch=<aggregateTimeout>`

Watches the `src` directory for changes and automatically rebuilds. Optional [aggregateTimeout](https://webpack.github.io/docs/configuration.html#watchoptions-aggregatetimeout) can be included which defaults to 300ms.

##### `--livereload=<aggregateTimeout>`

Activates `--watch` option and notifies the Express server that a change has occured and the application has been rebuilt. Must be serving with `gulp serve --livereload` in order to trigger an automatic browser refresh.

#### `gulp serve`

Starts an Express server at `http://localhost:6060`.

##### `--livereload`

Starts a livereload server and refreshes the browser when livereload events are received from `gulp build --livereload`.

#### `gulp test`

Runs a suite of Jasmine tests with Karma.

##### `--ci`

Watches for changes and runs tests on file change.

#### `gulp editorconfig`

Copies the [60fram.es coding standards](https://github.com/60frames/coding-standards) `.editorconfig` into the project.

#### `gulp lint`

Runs eslint using [60fram.es linting rules](https://github.com/60frames/coding-standards).

## Directory Structure

## Contribute

## Keywords
- React
- Webpack
- react-router
- ~~Isomorphic~~ Universal Javascript
- modernizr
- debug
- morgan
- Express
- Babel
- Gulp
- Karma
- Jasmine
- Eslint
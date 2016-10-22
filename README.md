# 60fram.es React Boilerplate [![Build Status](https://travis-ci.org/60frames/react-boilerplate.svg?branch=master)](https://travis-ci.org/60frames/react-boilerplate) [![Coverage Status](https://coveralls.io/repos/github/60frames/react-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/60frames/react-boilerplate?branch=master)

Production-ready boilerplate for building *universal* web apps with [React](https://github.com/facebook/react) and [Redux](https://github.com/reactjs/redux)

## tl;dr

```
$ git clone https://github.com/60frames/react-boilerplate.git
$ cd react-boilerplate
$ rm -r .git
$ cp ./server/_env ./server/.env
$ npm start
```

## Features

- ES2015/16 with [Babel](https://github.com/babel/babel)
- Universal rendering with support for data fetching
- Hot reloading on both client and *server*
- Locally scoped CSS with [CSS modules](https://github.com/css-modules)
- Scalable unit testing via [Jest](https://github.com/facebook/jest)
- Development and release builds with [Webpack](https://github.com/webpack/webpack)
- State management with [Redux](https://github.com/reactjs/redux)
- ...Just 4 commands

## Commands

### `npm start`

Serves the app in development mode

> NOTE: This is simply an alias for `npm run serve`.

### `npm test`

Runs unit tests

### `npm run build`

Builds the app ready for release

### `WEBPACK_DEV_SERVER=false npm run serve`

Serves the app in release mode

> NOTE: Requires you to first build the app with `npm run build`.

## Environment Variables

Environment variables are defined via Unix env vars and are documented in the [`./server/_env`](server/_env) file.

To avoid the hassle of having to define env vars on your local machine during development we recommend you simply rename the [`./server/_env`](server/_env) file to `./server/.env` which, in the absence of a predefined `NODE_ENV`, will be copied to your environment.

> NOTE: Any of the environment variables can be made available to the client by explicitly declaring them in the root [Html](src/components/html/Html.js) component. This extra step is required to prevent accidentally leaking sensitive data to the client.

## License
MIT

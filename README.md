# 60fram.es React Boilerplate

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
- ...Just four commands to grok

## Commands

### `npm start`

Serves the app in development mode

### `npm test`

Runs unit tests

### `npm run build`

Builds the app ready for release

### `NODE_ENV=production npm run serve`

Serves the app in production mode

> NOTE: Requires you to first build the app with `npm run build`.

## Environment Variables

Environment variables are, as you might expect, defined via Unix env vars.

> NOTE: To avoid the hassle of having to define env vars on your local machine during development we recommend you simply rename the [`./server/_env`](server/_env) file to `./server/.env` which, in the absence of a predefined `NODE_ENV`, will be read in instead.

| Name                | Description                                                                                                                                                                 | Server | Client |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|--------|
| NODE_ENV            | Defines the Node environment                                                                                                                                                | Y      | N      |
| PORT                | The port to listen on                                                                                                                                                       | Y      | N      |
| DEBUG               | Comma delimited 'names' defining which [debug](https://github.com/visionmedia/debug) logs to show                                                                           | Y      | N      |
| WEBPACK\_DEV_SERVER | Determines whether to run the server in production or development mode, i.e. Either serve static assets from `./dist` or dynamic assets using [`webpack-dev-middleware`](https://github.com/webpack/webpack-dev-middleware) | Y      | N      |
| BROWSER_CACHE       | Any valid [ms](https://github.com/rauchg/ms.js) to define how long static assets should be cached for                                                                      | Y      | N      |
| API_ENDPOINT        | The API endpoint used by the client. Notably this must be an *absolute* url to ensure it can be resolved when rendering on the server                                       | Y      | Y      |
| REDUX_LOGGER        | Turns on [redux-logger](https://github.com/evgenyrodionov/redux-logger) middleware                                                                                                                                        | Y      | Y      |
| BROWSER             | Determines whether the app is running in the browser or in node                                                                                                             | N      | Y      |

> NOTE: Any of the environment variables can be made available to the client by explicitly declaring them in the [Html](src/components/html/Html.js) component. This is required to prevent accidentally leaking sensitive data to the client.

## License
MIT

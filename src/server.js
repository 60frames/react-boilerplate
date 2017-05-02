import React from 'react';
import { compose } from 'redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { flushWebpackRequireWeakIds } from 'react-loadable';
import configureStore from 'store/configureStore';
import routes, { NotFoundComponent } from 'routes';
import Html from 'components/html/Html';

function flatten(arr) {
  return [].concat.apply([], arr);
}

function uniq(arr) {
  return [...new Set(arr)];
}

function isTruthy(val) {
  return !!val;
}

const flattenUniq = compose(uniq, flatten);

function fetchComponentData(renderProps, store) {
  const requests = renderProps.components.filter(isTruthy).map(component => {
    // Handle `connect`ed components.
    if (component.WrappedComponent) {
      component = component.WrappedComponent;
    }
    if (component.fetchData) {
      const { query, params, history } = renderProps;
      return (
        component
          .fetchData({
            dispatch: store.dispatch,
            query,
            params,
            history
          })
          // Make sure promise always successfully resolves
          .catch(() => {})
      );
    }
  });

  return Promise.all(requests);
}

function isNotFound(renderProps) {
  return (
    !renderProps ||
    renderProps.components.some(component => component === NotFoundComponent)
  );
}

function getJsByChunkName(name, { assetsByChunkName }) {
  let assets = assetsByChunkName[name];
  if (!Array.isArray(assets)) {
    assets = [assets];
  }
  return assets.find(asset => /\.js$/.test(asset));
}

function getJsByModuleIds(moduleIds, { modulesById, chunksById }) {
  const chunkIds = flatten(
    moduleIds.map(id => {
      const clientModule = modulesById[id];
      if (!clientModule) {
        throw new Error(`${id} not found in client stats`);
      }
      return clientModule.chunks;
    })
  );
  return flattenUniq(
    chunkIds.map(id => {
      return chunksById[id].files
        .filter(file => /\.js$/.test(file))
        .filter(file => !/\.hot-update\.js$/.test(file));
    })
  );
}

function getCssByChunkName(name, { assetsByChunkName }) {
  let assets = assetsByChunkName[name];
  if (!Array.isArray(assets)) {
    assets = [assets];
  }
  return assets.find(asset => /\.css$/.test(asset));
}

function getJs(moduleIds, stats) {
  return [
    getJsByChunkName('bootstrap', stats),
    ...getJsByModuleIds(moduleIds, stats),
    getJsByChunkName('client', stats)
  ].filter(isTruthy);
}

function getCss(stats) {
  return [getCssByChunkName('client', stats)].filter(isTruthy);
}

function render(renderProps, store, stats) {
  const markup = renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );
  const head = Helmet.rewind();
  const moduleIds = flushWebpackRequireWeakIds();
  const js = getJs(moduleIds, stats);
  const css = getCss(stats);
  const initialState = store.getState();

  return renderToStaticMarkup(
    <Html
      js={js}
      css={css}
      html={markup}
      head={head}
      initialState={initialState}
    />
  );
}

/**
 * Express middleware to render HTML using react-router
 * @param  {object}     stats Webpack stats output
 * @return {function}   middleware function
 */
export default ({ clientStats }) => {
  // Build stats maps for quicker lookups.
  const modulesById = clientStats.modules.reduce((modules, mod) => {
    modules[mod.id] = mod;
    return modules;
  }, {});
  const chunksById = clientStats.chunks.reduce((chunks, chunk) => {
    chunks[chunk.id] = chunk;
    return chunks;
  }, {});
  const assetsByChunkName = clientStats.assetsByChunkName;

  /**
     * @param  {object}     req Express request object
     * @param  {object}     res Express response object
     * @return {undefined}  undefined
     */
  return (req, res, next) => {
    const url = req.url;
    const memoryHistory = createMemoryHistory(url);
    const store = configureStore();
    const history = syncHistoryWithStore(memoryHistory, store);

    match(
      {
        history,
        routes,
        location: url
      },
      (error, redirectLocation, renderProps) => {
        if (error) {
          res.status(500).send(error.message);
        } else if (redirectLocation) {
          res.redirect(
            302,
            `${redirectLocation.pathname}${redirectLocation.search}`
          );
        } else {
          fetchComponentData(renderProps, store).then(() => {
            let html;
            try {
              html = render(renderProps, store, {
                modulesById,
                chunksById,
                assetsByChunkName
              });
            } catch (ex) {
              return next(ex);
            }
            res
              .status(isNotFound(renderProps) ? 404 : 200)
              .send(`<!doctype html>${html}`);
          });
        }
      }
    );
  };
};

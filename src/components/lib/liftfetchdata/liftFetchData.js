/**
 * Lifts static fetchData method from weakId component to `Component`, deliberately
 * circumventing static require / import to prevent Webpack from bundling the
 * weakId component and it's deps.
 */
export default webpackRequireWeakId => Component => {
  const weakId = webpackRequireWeakId();
  if (__webpack_modules__[weakId]) {
    const module = __webpack_require__(weakId).default;
    if (module && typeof module.fetchData === 'function') {
      Component.fetchData = (...args) => module.fetchData(...args);
    }
  }
  return Component;
};

/**
 * Lifts static `fetchData` method to `Component` to allow server to fetch
 * data without having to import Index.
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
}

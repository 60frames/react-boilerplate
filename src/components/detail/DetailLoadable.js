import React from 'react';
import loadable from 'components/lib/loadable/loadable';
import liftFetchData from 'components/lib/liftfetchdata/liftFetchData';
import Loader from 'components/lib/loader/Loader';
import Error from 'components/lib/error/Error';
import path from 'path';

// Up to date TODOS
// - Got it all working by mapping up module.identifier from client and server stats,
// prob need to test / have a think re: if that's reliable.
// - This breaks server side data depencies as react router component is now loadable
// (without fetchData...) if it's moved up then we don't split any redux selectors / actions.
// - Perhaps it's worth digging up that redux-saga SSR depenency solution instead so we rely
// less on components.
// - Or perhaps I can wrap think middleware to provide an api to identifiy what data is needed?

const webpackRequireWeakId = () => require.resolveWeak('./Detail');

const LoadingComponent = ({ isLoading, error, pastDelay }) => {
  if (isLoading && pastDelay) {
    return <Loader />;
  } else if (error) {
    return <Error>Error! Component failed to load</Error>;
  }
  return null;
};

const DetailLoadable = loadable({
  loader: () => import('./Detail'),
  LoadingComponent,
  webpackRequireWeakId
});

// Although code splitting would become less effective we might want to actually
// dispatch `fetchQuoteIfNeeded` when the LoadingComponent mounts to start fetching
// data deps earlier, or maybe even introduce another static method e.g. 'preFetch'
// which could just make the api call and have Detail dispatch it... Worth benchmarking.
export default liftFetchData(webpackRequireWeakId)(DetailLoadable);

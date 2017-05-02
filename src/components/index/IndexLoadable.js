import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Loadable from 'react-loadable';
import LiftFetchData from 'components/lib/liftfetchdata/liftFetchData';
import Loader from 'components/lib/loader/Loader';
import Error from 'components/lib/error/Error';

const webpackRequireWeakId = () => require.resolveWeak('./Index');

const LoadingComponent = ({ isLoading, error, pastDelay }) => {
  if (isLoading && pastDelay) {
    return <Loader />;
  } else if (error) {
    return <Error>Error! Component failed to load</Error>;
  }
  return null;
};

LoadingComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  pastDelay: PropTypes.bool.isRequired,
  error: PropTypes.bool
};

// NOTE: We're making a trade off for more aggresive code splitting (i.e. includes
// action creators) for waterfall requests when fetching the chunk and the data
// in the client.
const enhance = compose(LiftFetchData(webpackRequireWeakId), Loadable);

export default enhance({
  loader: () => import('./Index'),
  LoadingComponent,
  webpackRequireWeakId
});

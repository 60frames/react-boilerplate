import React from 'react';
import { compose } from 'redux';
import loadable from 'components/lib/loadable/loadable';
import liftFetchData from 'components/lib/liftfetchdata/liftFetchData';
import Loader from 'components/lib/loader/Loader';
import Error from 'components/lib/error/Error';
import path from 'path';

const webpackRequireWeakId = () => require.resolveWeak('./Index');

const LoadingComponent = ({ isLoading, error, pastDelay }) => {
    if (isLoading && pastDelay) {
        return <Loader />;
    } else if (error) {
        console.log('ERROR IS BEING RENDERED', error);
        return <Error>Error! Component failed to load</Error>;
    }
    return null;
};

// NOTE: We're making a trade off for more aggresive code splitting (i.e. includes
// action creators) for waterfall requests when fetching the chunk and the data
// in the client.
const enhance = compose(liftFetchData(webpackRequireWeakId), loadable);

export default enhance({
    loader: () => import('./Index'),
    LoadingComponent,
    webpackRequireWeakId
});

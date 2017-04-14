import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchQuoteIfNeeded } from 'actions/quote/quote';
import quoteReducer from 'reducers/quote/quote';
import Loader from 'components/lib/loader/Loader';
import Error from 'components/lib/error/Error';
import styles from 'components/index/Index.css';

// TODO: The server needs the complete root reducer up front as the store is
// populated before the component is mounted.

export class Index extends Component {
    // NOTE: Context isn't available in constructor, even after super...
    componentWillMount() {
        this.context.injectReducer({
            quote: quoteReducer
        });
    }

    componentDidMount() {
        const { dispatch } = this.props;
        Index.fetchData({ dispatch });
        debugger;
    }

    render() {
        const { isFetching, error, value } = this.props;
        return (
            <div className={styles.root}>
                {isFetching ? (
                    <Loader />
                ) : null}
                {error ? (
                    <Error>{error}</Error>
                ) : null}
                {value ? (
                    <p>{value}</p>
                ) : null}
            </div>
        );
    }
}

Index.contextTypes = {
    injectReducer: PropTypes.func
};

Index.fetchData = function({ dispatch }) {
    return dispatch(fetchQuoteIfNeeded());
};

function mapStateToProps(state) {
    return {
        ...state.quote
    };
}

export default connect(mapStateToProps)(Index);

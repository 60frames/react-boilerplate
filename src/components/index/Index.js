import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuoteIfNeeded } from 'actions/quote/quote';
import Loader from 'components/lib/loader/Loader';
import Error from 'components/lib/error/Error';
import DetailLoadable from 'components/detail/DetailLoadable';
import styles from 'components/index/Index.css';

export class Index extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        Index.fetchData({ dispatch });
    }

    render() {
        const { isFetching, error, value } = this.props;
        return (
            <div className={styles.root}>
                <DetailLoadable />
                <DetailLoadable />
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

Index.fetchData = function({ dispatch }) {
    return dispatch(fetchQuoteIfNeeded());
};

function mapStateToProps(state) {
    return {
        ...state.quote
    };
}

export default connect(mapStateToProps)(Index);

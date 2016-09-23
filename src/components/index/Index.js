import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuoteIfNeeded } from 'actions/quote/quote';
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
                {isFetching ? (
                    <p>Loading...</p>
                ) : null}
                {error ? (
                    <p>Error... {error}</p>
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

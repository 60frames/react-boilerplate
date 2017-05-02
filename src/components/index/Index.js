import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuoteIfNeeded } from 'actions/quote/quote';
import Loader from 'components/lib/loader/Loader';
import Error from 'components/lib/error/Error';
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
        {isFetching ? <Loader /> : null}
        {error ? <Error>{error}</Error> : null}
        {value ? <p>{value}</p> : null}
      </div>
    );
  }
}

Index.fetchData = function({ dispatch }) {
  return dispatch(fetchQuoteIfNeeded());
};

Index.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  value: PropTypes.string
};

function mapStateToProps(state) {
  return {
    ...state.quote
  };
}

export default connect(mapStateToProps)(Index);

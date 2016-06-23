import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { fetchPostsIfNeeded } from '../actions';

const DEFAULT_TITLE = 'React Boilerplate';

class App extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        App.fetchData({ dispatch });
    }

    render() {
        return (
            <div>
                <Helmet titleTemplate={`%s | ${DEFAULT_TITLE}`} defaultTitle={DEFAULT_TITLE} />
                {this.props.children}
                {JSON.stringify(this.props.data)}
            </div>
        );
    }
}

App.fetchData = function({ dispatch }) {
    return dispatch(fetchPostsIfNeeded());
};

function mapStateToProps(state) {
    return {
        ...state.posts
    };
}

export default connect(mapStateToProps)(App);

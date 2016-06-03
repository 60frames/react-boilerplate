import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { fetchPostsIfNeeded } from '../actions';

const DEFAULT_TITLE = 'React Boilerplate';

class App extends Component {

    componentDidMount() {
        App.fetchData(this.context.store);
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

App.contextTypes = {
    store: PropTypes.object.isRequired
};

App.fetchData = function(store) {
    return store.dispatch(fetchPostsIfNeeded());
};

function mapStateToProps(state) {
    return {
        ...state.posts
    };
}

export default connect(mapStateToProps)(App);

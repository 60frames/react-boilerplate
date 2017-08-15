import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import styles from 'components/app/App.css';

const DEFAULT_TITLE = '60fram.es React Boilerplate';

const f = () => {
  import(/* webpackChunkName: "jquery" */ 'jquery');
  import(/* webpackChunkName: "moment" */ 'moment');
  import(/* webpackChunkName: "lodash" */ 'lodash');
  import(/* webpackChunkName: "react-bootstrap" */ 'react-bootstrap');
};

const prefetch = () => {
  [
    '/jquery.js',
    '/moment.js',
    '/lodash.js',
    '/react-bootstrap.js'
  ].forEach(s => {
    const link = document.createElement('link');
    link.as = 'script';
    link.href = s;
    link.type = 'application/javascript';
    link.rel = 'prefetch';
    document.head.appendChild(link);
  });
};

class App extends Component {
  componentDidMount() {
    // prefetch();
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.root}>
        <Helmet
          titleTemplate={`%s | ${DEFAULT_TITLE}`}
          defaultTitle={DEFAULT_TITLE}
        />
        <div className={styles.logo}>
          <Link to="/" title="Home" className={styles.logoContent}>
            60fram.es
          </Link>
        </div>
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default App;

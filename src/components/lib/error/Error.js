import React from 'react';
import PropTypes from 'prop-types';
import styles from './Error.css';

const Error = ({ children }) => <div className={styles.root}>{children}</div>;

Error.propTypes = {
  children: PropTypes.node
};

Error.defaultProps = {
  children: 'Error'
};

export default Error;

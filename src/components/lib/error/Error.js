import React, { PropTypes } from 'react';
import styles from './Error.css';

const Error = ({ children }) => <div className={styles.root}>{children}</div>;

Error.propTypes = {
    children: PropTypes.node
};

Error.defaultProps = {
    children: 'Error'
};

export default Error;

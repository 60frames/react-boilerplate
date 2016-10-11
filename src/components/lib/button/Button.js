import React, { PropTypes } from 'react';
import styles from 'components/lib/button/Button.css';

function Button({ onClick, children }) {
    return (
        <button className={styles.root} onClick={onClick}>
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default Button;

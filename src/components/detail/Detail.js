import React from 'react';
import { connect } from 'react-redux';
import styles from 'components/detail/Detail.css';

function Detail({ greeting }) {
    return (
        <div className={styles.root}>
            {greeting}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        greeting: 'Hello <insert name here>, As a valued customer...',
    };
}

export default connect(mapStateToProps)(Detail);

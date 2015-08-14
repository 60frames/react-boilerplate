import React from 'react';
import style from './four04.css';

let Four04 = React.createClass({
    render() {
        return (
            <div>
                <h1 className={style.title}>404</h1>
                <p className={style.text}>
                    Oops, looks like this does not exist.
                </p>
            </div>
        );
    }
});

export default Four04;

import React from 'react';
import style from './boilerplate.css';

let Boilerplate = React.createClass({

    render() {
        return (
            <div>
                <h1 className={style.title}>react-boilerplate</h1>
                <p className={style.description}>
                    A React and Webpack boilerplate.<br />
                    Environment: {window.env.BROWSER_ENV}
                </p>
                <div className={style.logo}></div>
            </div>
        );
    }

});

export default Boilerplate;

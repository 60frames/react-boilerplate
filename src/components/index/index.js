import React from 'react';
import style from './index.css';
import reactLogo from '../../assets/img/react-logo.png';

let Index = React.createClass({
    render() {
        return (
            <div>
                <p className={style.description}>
                    A React and Webpack boilerplate.<br />
                    Environment: {window.env.BROWSER_ENV}
                </p>
                <div className={style.logo}></div>
                <img src={reactLogo} />
            </div>
        );
    }
});

export default Index;

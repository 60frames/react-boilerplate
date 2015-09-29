import React from 'react';
import Modernizr from 'modernizr';
import Helmet from 'react-helmet';
import style from './index.css';
import reactLogo from '../../assets/img/react-logo.png';

let Index = React.createClass({

    render() {
        var geoStr = Modernizr.geolocation ? ' is supported :)' :
                        ' is not supported :(';
        return (
            <div>
                <Helmet title="Home" />
                <p className={style.description}>
                    A React and Webpack boilerplate.<br />
                    Environment: {window.env.BROWSER_ENV}<br />
                    Geolocation: {geoStr}
                </p>
                <div className={style.logo}></div>
                <img src={reactLogo} />
            </div>
        );
    }
});

export default Index;

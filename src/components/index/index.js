import React from 'react';
import style from './index.css';
import Modernizr from 'modernizr';

let Index = React.createClass({

    render() {
        var geoStr = Modernizr.geolocation ? ' is supported :)' :
                        ' is not supported :(';
        return (
            <div>
                <p className={style.description}>
                    A React and Webpack boilerplate.<br />
                    Environment: {window.env.BROWSER_ENV}<br />
                    Geolocation: {geoStr}
                </p>
                <div className={style.logo}></div>
            </div>
        );
    }
});

export default Index;

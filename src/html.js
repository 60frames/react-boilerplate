import React from 'react';

let Html = React.createClass({

    propTypes: {
        css: React.PropTypes.string,
        js: React.PropTypes.string,
        markup: React.PropTypes.string
    },

    render() {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="x-ua-compatible" content="ie=edge,chrome=1" />
                    <title>React Boilerplate</title>
                    <meta name="description" content="" />
                    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <link rel="apple-touch-icon" href="apple-touch-icon.png" />
                    <meta name="msapplication-tap-highlight" content="no" />
                    <link rel="stylesheet" href={this.props.css} />
                </head>
                <body>
                    <div id="content" dangerouslySetInnerHTML={{
                        __html: this.props.markup
                    }} />
                    <script src={this.props.js}></script>
                </body>
            </html>
        );
    }
});

export default Html;

module.exports = {
    // Return true for all Modernizr tests when used. We want to assume on the
    // server that we are on the best browser when building the HTML
    // and let the client fallback if they are not supported.
    // This will mean the DOM is different on the server than the client
    // occasionally but its only a minor perf issue to render components again.
    // FOUC can occur.
    geolocation: true
};

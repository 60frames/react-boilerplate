'use strict';

const webpack = require('webpack');

// May want to provide a separate option to pull out bootstrapChunk.
// i.e. 'node' is overloaded.
module.exports = ({ codeSplitting, node }) => {
    const plugins = [];
    if (!codeSplitting) {
        plugins.push(
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            })
        );
    } else if (!node) {
        // Move webpack bootstrap to separate chunk to allow split chunks
        // to be loaded *before* main.
        // plugins.push(
        //     new webpack.optimize.CommonsChunkPlugin({
        //         names: ['bootstrap'],
        //         // TODO: Revision.
        //         filename: '[name].js',
        //         minChunks: Infinity,
        //     })
        // );
    }

    if (node) {
        // Nope.
        // plugins.push(
        //     new webpack.DefinePlugin({
        //         __dirname: '__dirname'
        //     })
        // );
    }

    return plugins;
};

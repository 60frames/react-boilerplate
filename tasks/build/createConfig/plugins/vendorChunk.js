'use strict';

const webpack = require('webpack');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

module.exports = ({ vendorChunk }) =>
    vendorChunk
        ? [
              // The vendor chunk serves two purposes, the obvious one is it
              // promotes long term caching, but it additionally is required to
              // lift the webpack bootstrap out of the main chunk, allowing
              // other chunks to be loaded before executing main.
              // NOTE: Currently the long term cachcing doesn't work as the
              // vendor chunk contains an array of chunk hashes so it'll always
              // be invalidated...could additionally include a bootstrap.js
              // or maybe use the ChunkManifestPlugin...
              //   https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95
              new webpack.optimize.CommonsChunkPlugin({
                  name: 'vendor',
                  // TODO: Prob avoid vendor.5c64e1ca5e2f0556403d8d08cb197296.css
                  // as it'll often be minimal, e.g. a reset.
                  minChunks: module =>
                      module.context &&
                      module.context.includes('node_modules') &&
                      !/\.css$/.test(module.resource)
              }),

              // TODO: Move to own plugin, it's not directly related to vendorChunk.
              new ChunkManifestPlugin({
                  filename: 'chunk-manifest.json',
                  //   manifestVariable: 'webpackManifest'
                  manifestVariable: '__webpack_chunk_manifest__'
              })
          ]
        : [];

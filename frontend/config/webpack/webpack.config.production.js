// Child Webpack configuration extended by webpack.config.base

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const webpackConfigBase = require('./webpack.config.base');
const config = require('../config.base');

module.exports = webpackMerge(webpackConfigBase, {
  module: {
    rules: []
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(config.uglifyJsPlugin)
  ]
});

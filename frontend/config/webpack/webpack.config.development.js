// Child Webpack configuration extended by webpack.config.base

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const webpackConfigBase = require('./webpack.config.base');
const config = require('../config.base');

module.exports = webpackMerge(webpackConfigBase, {
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        include: /src/,
        use: config.rules.stylesheets,
      },
      {
        test: /\.(scss|css)$/,
        include: /node_modules/,
        use: config.rules.vendorStylesheets,
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new StyleLintPlugin()
    // enable watch style lint
  ]
});

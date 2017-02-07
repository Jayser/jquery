// Common Webpack configuration

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const config = require('../config.base');

module.exports = {
  context: config.paths.context,
  entry: config.paths.entry,
  output: config.paths.output,
  resolve: { extensions: ['.js'] },
  module: {
    rules: [
      // ESLint
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: ['eslint-loader'],
      },
      // JavaScript / ES6
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // Images
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: config.paths.rules.images
        }
      },
      // Fonts
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: config.paths.rules.fonts
        }
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin(config.plugins.definePlugin),
    new HtmlWebpackPlugin(config.plugins.htmlWebpackPlugin),
    new webpack.LoaderOptionsPlugin(config.plugins.loaderOptionsPlugin)
  ],
  devtool: config.devtool
};

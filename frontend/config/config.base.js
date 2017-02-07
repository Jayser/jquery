const { resolve, normalize } = require('path');

const root = resolve(__dirname, '../');

const {
  HOST = 'localhost',
  PORT = 8000,
  NODE_ENV = 'development'
} = process.env;

const ENV = {
  __DEV__: NODE_ENV === 'development',
  __PROD__: NODE_ENV === 'production',
  __COVERAGE__: NODE_ENV === 'coverage',
  __TEST__: NODE_ENV === 'test',
  __ENV__: JSON.stringify(process.env.NODE_ENV)
};

const publicPath = ENV.__PROD__ ? './' : `http://${ HOST }:${ PORT }/`;

function addHash(path, opt) {
  const hash = opt && opt.chunkHash ? 'chunkhash' : 'hash';
  return path + (ENV.__PROD__ ? `?[${ hash }]` : '');
}

module.exports = {
  paths: {
    context: normalize(`${ root }/src`),
    entry: {
      app: './index.js',
      vendor: [
        'bootstrap-sass/assets/stylesheets/_bootstrap.scss',
        'babel-polyfill',
        'es6-promise',
        'react-dom',
        'react-redux',
        'react-router',
        'react',
        'redux-thunk',
        'redux'
      ]
    },
    output: {
      publicPath,
      path: normalize(`${ root }/build`),
      filename: addHash('js/[name].bundle.js'),
      chunkFilename: addHash('js/[name].chunk.js', { chunkHash: true }),
    },
    rules: {
      images: addHash('images/[name].[ext]'),
      fonts: addHash('fonts/[name].[ext]')
    },
  },
  rules: {
    stylesheets: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          minimize: ENV.__PROD__,
          sourceMap: !ENV.__PROD__,
          localIdentName: ENV.__PROD__ ? '[name]__[local]__[hash:base64:5]' : '[name]__[local]',
          modules: true
        }
      },
      'postcss-loader',
      'resolve-url-loader',
      'sass-loader?sourceMap'
    ],
    vendorStylesheets: [
      'style-loader',
      'css-loader',
      'postcss-loader',
      'resolve-url-loader',
      'sass-loader?sourceMap'
    ]
  },
  plugins: {
    htmlWebpackPlugin: {
      favicon: 'favicon.ico',
      template: './index.html',
      minify: ENV.__PROD__ ? {
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        } : false
    },
    uglifyJsPlugin: {
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    },
    definePlugin: ENV,
    loaderOptionsPlugin: {
      test: /\.scss$/,
      debug: true,
      minimize: ENV.__PROD__,
      options: {
        postcss: [
          require('autoprefixer')({ browsers: ['last 2 versions'] })
        ],
        context: normalize(`${ root }/src`),
        output: { path: publicPath }
      }
    }
  },
  devServer: {
    historyApiFallback: true,
    compress: ENV.__PROD__,
    inline: !ENV.__PROD__,
    hot: !ENV.__PROD__,
    publicPath,
    stats: {
      chunks: false,
      errorDetails: true,
      colors: true
    },
  },
  devtool: ENV.__PROD__ ? 'eval' : 'source-map',
  proxy: !ENV.__PROD__ ? { 'target': 'http://localhost:4040' } : {},
  env: { HOST, PORT, NODE_ENV }
};

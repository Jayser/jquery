const url = require('url');
const http = require('http');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxy = require("http-proxy").createProxyServer();

const webpackConfig = require('./config/webpack/webpack.config.development');
const config = require('./config/config.base');

const app = express();
const compiler = webpack(webpackConfig);

function log() {
    arguments[0] = '\nWebpack: ' + arguments[0];
    console.log.apply(console, arguments);
}

app.use(webpackDevMiddleware(compiler, config.devServer));

app.use(webpackHotMiddleware(compiler));

app.use("/api/*", (req, res) => {
  req.url = req.baseUrl;
  proxy.web(req, res, config.proxy);
  proxy.on('error', (err, req, res) => {
    console.error(err);
    res.send(err);
  });
});

// Important part. Send down index.html for all requests
app.use('*', (req, res) => {
    // https://github.com/ReactTraining/react-router/issues/676#issuecomment-73963306
    const opts = url.parse(config.devServer.publicPath);
    const myReq = http.request(opts, (myRes) => {
        res.writeHead(myRes.statusCode, myRes.headers);
        myRes.pipe(res);
    });

    myReq.end();
});

app.listen(config.env.PORT, config.env.HOST, (err) => {
    if (err) {
        log(err);
        return;
    }

    log('App is listening at http://%s:%s, (%s)', config.env.HOST, config.env.PORT, config.env.NODE_ENV);
});

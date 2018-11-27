'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = undefined;

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _lodash = require('lodash');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaCompress = require('koa-compress');

var _koaCompress2 = _interopRequireDefault(_koaCompress);

var _koaMount = require('koa-mount');

var _koaMount2 = _interopRequireDefault(_koaMount);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _appHtmlMiddleware = require('./appHtmlMiddleware');

var _appHtmlMiddleware2 = _interopRequireDefault(_appHtmlMiddleware);

var _appSSRMiddleware = require('./appSSRMiddleware');

var _appSSRMiddleware2 = _interopRequireDefault(_appSSRMiddleware);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultOptions = {
  appHtmlFile: 'index.html',
  enableWebpackMiddleware: 'false',
  publicPath: '/',
  staticFolder: './dist/public',
  webpackConfigFile: './webpack.dev.js',
  ssr: false
};

const App = exports.App = opts => {
  const options = (0, _lodash.defaults)({}, opts, defaultOptions);

  // TODO is this validation adequate?
  (0, _assert2.default)((0, _lodash.isString)(options.enableWebpackMiddleware), 'Invalid Webpack HMR Setup');
  (0, _assert2.default)((0, _lodash.isString)(options.webpackConfigFile), 'Invalid Webpack config file path');
  (0, _assert2.default)((0, _lodash.isString)(options.staticFolder), 'Invalid static folder path');
  (0, _assert2.default)((0, _lodash.isString)(options.appHtmlFile), 'Invalid HTML file path');

  const app = new _koa2.default();
  app.use((0, _koaCompress2.default)());

  const env = (0, _lodash.defaults)({}, process.env, options.env);
  const configRouter = (0, _config2.default)(env);
  app.use((0, _koaMount2.default)(options.publicPath, configRouter.routes()));
  app.use((0, _koaMount2.default)(options.publicPath, (0, _koaStatic2.default)(_path2.default.resolve(options.staticFolder))));

  if (options.enableWebpackMiddleware === 'true') {
    const webpackHmrMiddleware = require('koa-webpack');
    app.use(webpackHmrMiddleware({
      config: require(_path2.default.resolve(options.webpackConfigFile))
    }));
  }

  if (!options.ssr) {
    app.use((0, _appHtmlMiddleware2.default)(_path2.default.resolve(options.staticFolder, options.appHtmlFile)));
  }

  if (options.ssr === 'true') {
    app.use((0, _appSSRMiddleware2.default)());
  }

  return app;
};

exports.default = App;
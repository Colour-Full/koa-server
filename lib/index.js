'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = exports.hotModuleMiddleware = exports.staticOpts = exports.staticRoot = exports.staticMiddleware = exports.routerMiddleware = undefined;

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaWebpack = require('koa-webpack');

var _koaWebpack2 = _interopRequireDefault(_koaWebpack);

var _app = require('./bin/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routerMiddleware = exports.routerMiddleware = _koaRouter2.default;
const staticMiddleware = exports.staticMiddleware = _koaStatic2.default;
const staticRoot = exports.staticRoot = _koaStatic.root;
const staticOpts = exports.staticOpts = _koaStatic.opts;
const hotModuleMiddleware = exports.hotModuleMiddleware = _koaWebpack2.default;

exports.App = _app2.default;
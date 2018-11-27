#!/usr/bin/env node
'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _lodash = require('lodash');

var _nodeServerLogger = require('node-server-logger');

var _nodeServerLogger2 = _interopRequireDefault(_nodeServerLogger);

var _app = require('./app.js');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = new _nodeServerLogger2.default('spa-server-logger', 'console', 'info', { serializers: { ctx: _nodeServerLogger.ctxSerializer } });
const port = process.env.PORT || '9000';
(0, _assert2.default)((0, _lodash.isString)(port), 'Invalid port');

const app = (0, _app2.default)({
  appHtmlFile: process.env.HTML,
  enableWebpackMiddleware: process.env.WEBPACK_MIDDLEWARE || process.env.HOT_MODULES,
  publicPath: process.env.PUBLIC_PATH,
  staticFolder: process.env.PUBLIC_DIR,
  webpackConfigFile: process.env.WEBPACK_CONFIG_FILE
});

app.listen(port);

logger.info('Your SPA is now running on port ' + port);
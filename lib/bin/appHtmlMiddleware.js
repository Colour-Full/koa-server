'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createMiddleware = appHtmlFilePath => {
  return async (ctx, next) => {
    if (!_fs2.default.existsSync(appHtmlFilePath)) return next();

    ctx.compress = true;
    ctx.type = 'text/html';
    ctx.body = _fs2.default.createReadStream(appHtmlFilePath, { encoding: 'utf8' });
  };
};

exports.default = createMiddleware;
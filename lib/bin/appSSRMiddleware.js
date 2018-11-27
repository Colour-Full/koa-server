'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appSSRMiddleware = () => {
  return async (ctx, next) => {
    const { renderReactApp } = require(_path2.default.resolve('./', process.env.HTML));

    ctx.compress = true;
    ctx.type = 'text/html';
    ctx.body = renderReactApp(ctx);
  };
};

exports.default = appSSRMiddleware;
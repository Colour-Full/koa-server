'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middleware = exports.getSpaEnvVars = undefined;

var _curry = require('lodash/curry');

var _curry2 = _interopRequireDefault(_curry);

var _reduce = require('lodash/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SPA_CONST_PREFIX = 'SPA_';

const spaVarReducer = (result, value, key) => {
  if (!key.startsWith(SPA_CONST_PREFIX)) return result;

  result[key.substring(SPA_CONST_PREFIX.length)] = value;
  return result;
};
const getSpaEnvVars = exports.getSpaEnvVars = env => (0, _reduce2.default)(env, spaVarReducer, {});

const middleware = exports.middleware = (0, _curry2.default)(async function configMiddleware(env, ctx, next) {
  ctx.type = 'json';
  ctx.body = getSpaEnvVars(env);
  ctx.status = 200;
});

const createRouter = env => {
  const router = new _koaRouter2.default();
  router.get('/config', middleware(env));
  return router;
};

exports.default = createRouter;
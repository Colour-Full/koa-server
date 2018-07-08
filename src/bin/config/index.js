import curry from 'lodash/curry'
import reduce from 'lodash/reduce'
import Router from 'koa-router'

const SPA_CONST_PREFIX = 'SPA_'

const spaVarReducer = (result, value, key) => {
  if (!key.startsWith(SPA_CONST_PREFIX)) return result

  result[key.substring(SPA_CONST_PREFIX.length)] = value
  return result
}
export const getSpaEnvVars = (env) => reduce(env, spaVarReducer, {})

export const middleware = curry(
  async function configMiddleware (env, ctx, next) {
    ctx.type = 'json'
    ctx.body = getSpaEnvVars(env)
    ctx.status = 200
  }
)

const createRouter = (env) => {
  const router = new Router()
  router.get('/config', middleware(env))
  return router
}

export default createRouter

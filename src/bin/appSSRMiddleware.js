import path from 'path'
import Logger from 'node-server-logger'

const appSSRMiddleware = () => {
  return async (ctx, next) => {
    const renderReactApp = require(path.resolve('./', process.env.HTML))

    ctx.compress = true
    ctx.type = 'text/html'
    ctx.body = renderReactApp(ctx, Logger)
  }
}

export default appSSRMiddleware

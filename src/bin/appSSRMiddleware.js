import path from 'path'

const appSSRMiddleware = () => {
  return async (ctx, next) => {
    const { renderReactApp } = require(path.resolve('./', process.env.HTML))

    ctx.compress = true
    ctx.type = 'text/html'
    ctx.body = renderReactApp(ctx)
  }
}

export default appSSRMiddleware

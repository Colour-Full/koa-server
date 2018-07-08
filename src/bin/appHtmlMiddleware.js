import fs from 'fs'

const createMiddleware = appHtmlFilePath => {
  return async (ctx, next) => {
    if (!fs.existsSync(appHtmlFilePath)) return next()

    ctx.compress = true
    ctx.type = 'text/html'
    ctx.body = fs.createReadStream((appHtmlFilePath), {encoding: 'utf8'})
  }
}

export default createMiddleware

import Router from 'koa-router'
import serve, {root, opts} from 'koa-static'
import webpackHmrMidleware from 'koa-webpack'
import App from './bin/app'

export const routerMiddleware = Router
export const staticMiddleware = serve
export const staticRoot = root
export const staticOpts = opts
export const hotModuleMiddleware = webpackHmrMidleware

export {
  App
}

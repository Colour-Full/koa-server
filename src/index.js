import Router from 'koa-router'
import serve, {root, opts} from 'koa-static'
import webpackHmrMiddleware from 'koa-webpack'
import App from './bin/app'
import Logger from 'node-server-logger'
import compressMiddleware from 'koa-compress'

export {
  App,
  Router,
  serve,
  root,
  opts,
  webpackHmrMiddleware,
  Logger,
  compressMiddleware
}

import assert from 'assert'
import { defaults, isString } from 'lodash'
import Koa from 'koa'
import compressMiddleware from 'koa-compress'
import mount from 'koa-mount'
import staticFileMiddleware from 'koa-static'
import path from 'path'

import appHtmlMiddleware from './appHtmlMiddleware'
import appSSRMiddleware from './appSSRMiddleware'
import config from './config'

const defaultOptions = {
  appHtmlFile: 'index.html',
  enableWebpackMiddleware: 'false',
  publicPath: '/',
  staticFolder: './dist/public',
  webpackConfigFile: './webpack.dev.js',
  ssr: false
}

export const App = (opts) => {
  const options = defaults({}, opts, defaultOptions)

  // TODO is this validation adequate?
  assert(isString(options.enableWebpackMiddleware), 'Invalid Webpack HMR Setup')
  assert(isString(options.webpackConfigFile), 'Invalid Webpack config file path')
  assert(isString(options.staticFolder), 'Invalid static folder path')
  assert(isString(options.appHtmlFile), 'Invalid HTML file path')

  const app = new Koa()
  app.use(compressMiddleware())

  const env = defaults({}, process.env, options.env)
  const configRouter = config(env)
  app.use(mount(options.publicPath, configRouter.routes()))
  app.use(mount(options.publicPath, staticFileMiddleware(path.resolve(options.staticFolder))))

  if (options.enableWebpackMiddleware === 'true') {
    const webpackHmrMiddleware = require('koa-webpack')
    app.use(webpackHmrMiddleware({
      config: require(path.resolve(options.webpackConfigFile))
    }))
  }

  if (!options.ssr) {
    app.use(appHtmlMiddleware(path.resolve(options.staticFolder, options.appHtmlFile)))
  }

  if (options.ssr === 'true') {
    app.use(appSSRMiddleware())
  }

  return app
}

export default App

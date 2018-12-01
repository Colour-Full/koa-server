#!/usr/bin/env node
import assert from 'assert'
import { isString } from 'lodash'
import Logger, { ctxSerializer } from 'node-server-logger'

import App from './app.js'

const port = process.env.PORT || '9000'
const appName = process.env.APP_NAME || 'spa-server'
const logger = new Logger(appName, 'console', 'info', { serializers: { ctx: ctxSerializer } })
assert(isString(port), 'Invalid port')

const app = App({
  appHtmlFile: process.env.HTML,
  enableWebpackMiddleware: process.env.WEBPACK_MIDDLEWARE || process.env.HOT_MODULES,
  publicPath: process.env.PUBLIC_PATH,
  staticFolder: process.env.PUBLIC_DIR,
  webpackConfigFile: process.env.WEBPACK_CONFIG_FILE
})

app.listen(port)

logger.info('Your SPA is now running on port ' + port)

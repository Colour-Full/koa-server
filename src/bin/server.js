#!/usr/bin/env node
import assert from 'assert'
import { isString } from 'lodash'
import Logger, { ctxSerializer } from 'node-server-logger'

import App from './app.js'

const logger = new Logger('spa-server', 'console', 'info', { serializers: { ctx: ctxSerializer } })
const port = process.env.PORT || '9000'
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

#!/usr/bin/env node
import assert from 'assert'
import { isString } from 'lodash'

import App from './app.js'

const port = process.env.PORT || '9000'
assert(isString(port), 'Invalid port')

const app = App({
  appHtmlFile: process.env.HTML,
  enableWebpackMiddleware: process.env.WEBPACK_MIDDLEWARE || process.env.HOT_MODULES,
  publicPath: process.env.PUBLIC_PATH,
  staticFolder: process.env.PUBLIC_DIR,
  webpackConfigFile: process.env.WEBPACK_CONFIG_FILE,
  ssr: process.env.SSR
})

app.listen(port)

// TODO : this should use the server-logger
console.log('Your SPA is now running on port ' + port)

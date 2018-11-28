const renderReactApp = (ctx, Logger) => {
  const logger = new Logger('example-ssr-app', 'console', 'info')

  const html = `
  <!DOCTYPE html>
  <html lang="en-GB">
  <head>
    <meta charset="UTF-8"/>
    <title>Rullion self serve — your data</title>
  </head>

  <body>
  <div id="root">
  <h1>This is a server side rendered HTML</h1>
  </div> 
  </body>
  </html>
  `
  logger.info('Server Side HTML has been served')
  return html
}

module.exports = renderReactApp

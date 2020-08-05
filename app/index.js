const path = require('path')
const Koa = require('koa')
const mount = require('koa-mount')
const serve = require('koa-static')
const templating = require('./middleware/templating')
const homeRouter = require('./route/home')
const apiRouter = require('./route/api')
const config = require('./config')
const handleError = require('./middleware/handleError')

const log = require('debug')('app')
const app = new Koa()

/**
 * Inject configuration
 */

app.config = config

/**
 * Add template engine
 */

app.use(templating(path.join(__dirname, 'templates')))

/**
 * Serve static files
 */

app.use(mount('/static', serve(path.join(__dirname, 'static'))))

/**
 * Mount routers
 */

app.use(mount('/home', handleError('html')))
app.use(mount('/home', homeRouter.routes()))
app.use(mount('/home', homeRouter.allowedMethods()))

app.use(mount('/api', handleError('json')))
app.use(mount('/api', apiRouter.routes()))
app.use(mount('/api', apiRouter.allowedMethods()))

app.on('error', (err, ctx) => {
  log(err)
})

module.exports = app

const path = require('path')
const Koa = require('koa')
const mount = require('koa-mount')
const serve = require('koa-static')
const templating = require('./middleware/templating')
const homeRouter = require('./route/home')
const config = require('./config')

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

app.use(mount('/home', homeRouter.routes()))

/**
 * Handle error
 */

app.use(async (ctx, next) => {
  ctx.status = 404
  ctx.body = { status: 'error', message: 'page not found' }
  await next()
})

app.on('error', (err, ctx) => {
  log(err)
})

module.exports = app

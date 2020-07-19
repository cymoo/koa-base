const path = require('path')
const Koa = require('koa')
const mount = require('koa-mount')
const serve = require('koa-static')
const templating = require('./middleware/templating')
const homeRouter = require('./route/home')
const config = require('./config')

const app = new Koa()

/**
 * Add configuration
 */

app.config = config

/**
 * Mount middleware
 */

app.use(mount('/static', serve(path.join(__dirname, 'static'))))
app.use(templating(path.join(__dirname, 'templates')))

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

module.exports = app

const Koa = require('koa')
const mount = require('koa-mount')
const path = require('path')
const koaStatic = require('koa-static')
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

app.use(mount('/static', koaStatic(path.join(__dirname, 'app/static'))))
app.use(templating(path.join(__dirname, 'app/templates')))

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

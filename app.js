const Koa  = require('koa')
const mount  = require('koa-mount')
const path = require('path')
const serveStatic  = require('koa-static')
const templating = require('./app/middleware/templating')
const homeRouter  = require('./app/route/home')
const config = require('./config')

const app = new Koa()

/**
 * Add configuration
 */

app.config = config

/**
 * Mount middlewares
 */


app.use(mount('/static', serveStatic(path.join(__dirname, 'app/static'))))
app.use(templating(path.join(__dirname, 'app/views')))

/**
 * Mount routers
 */

app.use(mount('/home', homeRouter.routes()))

/**
 * Handle error
 */

app.use(async (ctx, next) => {
  ctx.status = 404
  ctx.body = { errMsg: '404 not found' }
  await next()
})

app.listen(3000)

module.exports = app

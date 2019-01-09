const Koa  = require('koa')
const mount  = require('koa-mount')
const path = require('path')
const static  = require('koa-static')
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


app.use(mount('/public', static(path.join(__dirname, 'app/public'))))
app.use(templating(path.join(__dirname, 'app/view')))

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


module.exports = app

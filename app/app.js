const Koa  = require('koa')
const mount  = require('koa-mount')
const path = require('path')
const static  = require('koa-static')
const log = require('debug')('app')
const templating = require('./middlewares/templating')
const homeRouter  = require('./routes/home')

const app = new Koa()

/* Serve static files */
app.use(mount('/static', static(path.join(__dirname, 'static'))))

/* Mount middlewares */
app.use(templating(path.join(__dirname, 'views')))

/* Mount routers */
app.use(mount('/home', homeRouter.routes()))

app.listen(3000, () => {
  log('server running at 3000')
})

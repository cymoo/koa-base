const Router = require('koa-router')

const router = new Router()

// CORS
router.use(async (ctx, next) => {
  const config = ctx.app.config
  console.log(config.ACCESS_CONTROL_ALLOW_HEADERS)
  ctx.set('Access-Control-Allow-Origin', config.ACCESS_CONTROL_ALLOW_ORIGIN)
  ctx.set('Access-Control-Allow-Methods', config.ACCESS_CONTROL_ALLOW_METHODS)
  ctx.set('Access-Control-Allow-Headers', config.ACCESS_CONTROL_ALLOW_HEADERS)
  await next()
})

router.get('/', (ctx) => {
  ctx.body = {
    status: 'success',
    data: 'hello',
  }
})

router.get('/will-throw', (ctx) => {
  ctx.throw(new Error('ops, server error'))
})

module.exports = router

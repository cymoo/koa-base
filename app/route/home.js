const Router = require('koa-router')

const router = new Router()

router.get('/will-throw', async (ctx) => {
  const err = new Error('hack!')
  err.status = 401
  ctx.throw(err)
})

router.get('/', async (ctx, next) => {
  ctx.render('home.html', { msg: 'keep calm and carry on' })
})

router.get('/foo', async (ctx) => {
  ctx.throw(400, { status: 'error', foo: 'bar' }, { user: 'foo' })
})

router.get('/will-throw', async (ctx) => {
  throw new Error('something bad happens')
})

module.exports = router

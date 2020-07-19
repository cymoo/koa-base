const Router = require('koa-router')

const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.render('home.html', { msg: 'keep calm and carry on' })
})

router.get('/foo', async (ctx) => {
  ctx.throw(400, { status: 'error', foo: 'bar' }, { user: 'foo' })
})

module.exports = router

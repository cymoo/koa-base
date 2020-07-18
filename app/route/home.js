const Router = require('koa-router')

const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.render('home.html', { msg: 'keep calm and carry on' })
})

module.exports = router

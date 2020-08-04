const statuses = require('statuses')

const handleError = (type = 'json', template = 'error.html') => {
  return async function handleError(ctx, next) {
    try {
      await next()
      if (ctx.status === 404 && !ctx.body) ctx.throw(404)
    } catch (err) {
      ctx.app.emit('error', err, ctx)

      const res = ctx.res
      // first unset headers
      res.getHeaderNames().forEach((name) => {
        if (!name.toLowerCase().startsWith('access_control')) {
          res.removeHeader(name)
        }
      })
      // then set those specified
      ctx.set(err.headers)

      let statusCode = err.status || err.statusCode
      // ENOENT support
      if (err.code === 'ENOENT') statusCode = 404
      // default to 500
      if (typeof statusCode !== 'number' || !statuses(statusCode)) statusCode = 500

      const env = process.env.NODE_ENV || 'development'

      const msg = env === 'development' || err.expose ? err.message : statuses(statusCode)
      ctx.status = err.status = statusCode

      switch (type) {
        case 'json':
          ctx.type = 'application/json'
          if (env === 'development') {
            ctx.body = {
              status: 'error',
              message: msg,
              detail: err.stack,
            }
          } else {
            ctx.body = {
              status: 'error',
              message: msg,
            }
          }
          break
        case 'text':
          ctx.type = 'text/plain'
          ctx.body = msg
          break
        case 'html':
          ctx.type = 'text/html'
          ctx.render(template, { env, msg, err })
          break
        default:
        // ignore
      }
    }
  }
}

module.exports = handleError

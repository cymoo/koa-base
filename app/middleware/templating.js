const nunjucks = require('nunjucks')

/* https://nunjucks.bootcss.com/api.html */
function createEnv(
  path,
  {
    autoescape = true,
    throwOnUndefined = false,
    trimBlocks = false,
    lstripBlocks = false,
    watch = false,
    noCache = false,
    tags = {},
    filters = [],
    extensions = [],
    globals = [],
  } = {}
) {
  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(path || 'views', {
      noCache,
      watch,
    }),
    {
      autoescape,
      throwOnUndefined,
      trimBlocks,
      lstripBlocks,
      tags,
    }
  )
  filters.forEach(([name, func]) => {
    env.addFilter(name, func)
  })
  extensions.forEach(([name, ext]) => {
    env.addExtension(name, ext)
  })
  globals.forEach(([name, value]) => {
    env.addGlobal(name, value)
  })
  return env
}

function templating(path, options) {
  const env = createEnv(path, options)

  return async (ctx, next) => {
    ctx.render = (view, model = {}) => {
      ctx.response.type = 'text/html'
      ctx.response.body = env.render(view, { ctx, ...model })
    }
    await next()
  }
}

module.exports = templating

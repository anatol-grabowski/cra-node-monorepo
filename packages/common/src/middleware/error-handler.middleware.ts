import Koa from 'koa'

export function errorHandlerMiddleware() {
  return async (ctx: Koa.ParameterizedContext, next) => {
    try {
      await next()
    } catch (err) {
      console.error(`Error at '${ctx.request.method} ${ctx.request.originalUrl}':\n`, err)
      ctx.status = err.status || 500
      ctx.body = err.message
      // ctx.app.emit('error', err, ctx)
    }
  }
}

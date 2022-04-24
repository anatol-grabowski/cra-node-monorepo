import Koa from 'koa'

export function requestLoggerMiddleware() {
  return async (ctx: Koa.ParameterizedContext, next) => {
    const logObj = {
      query: { ...ctx.request.query },
      body: ctx.request.body,
    }
    console.log(`HTTP request  '${ctx.method} ${ctx.href}':\n`, logObj)
    await next()
  }
}

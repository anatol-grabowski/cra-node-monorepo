import Koa from 'koa'
import Router from 'koa-router'
import c2k from 'koa-connect'
import bodyParser from 'koa-bodyparser'
import { requestLoggerMiddleware } from '@common/middleware/request-logger.middleware'
import { responseLoggerMiddleware } from '@common/middleware/response-logger.middleware'
import { errorHandlerMiddleware } from '@common/middleware/error-handler.middleware'

export function createHttpApp() {
  const app = new Koa()

  app.use(c2k(responseLoggerMiddleware({ maxBytes: 1024, maxCharsLoggedIfOver: 50 })))
  app.use(errorHandlerMiddleware())
  app.use(bodyParser())
  app.use(requestLoggerMiddleware())

  const router = new Router()
  router.get('/', (ctx) => {
    ctx.body = 'Hello Koa'
  })

  app.use(router.routes()).use(router.allowedMethods())

  return app
}

import Koa from 'koa'
import c2k from 'koa-connect'
import bodyParser from 'koa-bodyparser'
import { requestLoggerMiddleware } from '../middleware/request-logger.middleware'
import { responseLoggerMiddleware } from '../middleware/response-logger.middleware'
import { errorHandlerMiddleware } from '../middleware/error-handler.middleware'

export const app = new Koa()

app.use(c2k(responseLoggerMiddleware({ maxBytes: 1024, maxCharsLoggedIfOver: 50 })))
app.use(errorHandlerMiddleware())
app.use(bodyParser())
app.use(requestLoggerMiddleware())

app.use((ctx) => {
  ctx.body = 'Hello Koa'
})

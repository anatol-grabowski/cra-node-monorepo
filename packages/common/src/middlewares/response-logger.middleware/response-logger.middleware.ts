import { IncomingMessage, ServerResponse } from 'http'
import { StreamInterceptor } from './stream-interceptor'

/**
 * Should be the very first middleware used to correctly intercept everything.
 */
export function responseLoggerMiddleware({ maxBytes = 1024, maxCharsLoggedIfOver = 50 } = {}) {
  return (request: IncomingMessage, response: ServerResponse, next) => {
    const startTime = Date.now()
    const responseInterceptor = new StreamInterceptor(response, maxBytes)

    response.on('finish', () => {
      const { isOverMaxBytes, totalBytes, buffer } = responseInterceptor.getResult()
      const body = isOverMaxBytes
        ? `${buffer.toString('utf8').slice(0, maxCharsLoggedIfOver)}...`
        : buffer.toString('utf8')
      const logObj = {
        // status: response.statusCode,
        body,
        totalBytes,
        executionTimeMs: Date.now() - startTime,
      }
      console.log(
        'HTTP response',
        response.statusCode,
        `'${request.method} ${request.url}':\n`,
        logObj,
      )
    })
    next()
  }
}

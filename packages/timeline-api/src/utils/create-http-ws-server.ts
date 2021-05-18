import * as http from 'http'
import * as WebSocket from 'ws'

/**
 * Assume `wsServer` to be created with `noServer: true` option.
 * `httpHandler` can be accessed as `app.handler` in `express` or as `app.callback` in `koa`.
 *
 * Create http server.
 * Handle 'request' events via `httpHandler`.
 * On 'upgrade' event call `wsServer.handleUpgrade` and emit 'connection' event from `wsServer`.
 */
export function createHttpWsServer(
  httpHandler: http.RequestListener,
  wsServer: WebSocket.Server,
): http.Server {
  const server = http.createServer()

  server.on('request', httpHandler)

  server.on('upgrade', (request, socket, head) => {
    console.log('upgrade to ws')
    wsServer.handleUpgrade(request, socket, head, (ws) => {
      wsServer.emit('connection', ws, request)
    })
  })

  return server
}

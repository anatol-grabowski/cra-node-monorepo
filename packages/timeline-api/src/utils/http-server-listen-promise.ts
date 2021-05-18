import * as http from 'http'

/**
 * Register `reject` as 'error' events handler.
 * Try to `server.listen`.
 * If successfull then unregister `reject` as 'error' events handler and `resolve`.
 */
export async function httpServerListenPromise(server: http.Server, port: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    server.on('error', reject)

    const listenCb = () => {
      server.off('error', reject)
      resolve()
    }
    server.listen(port, listenCb)
  })
}

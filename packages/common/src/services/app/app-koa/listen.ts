import { getOwnIps } from '@common/utils/get-own-ips'
import { createHttpWsServer } from '@common/utils/create-http-ws-server'
import { httpServerListenPromise } from '@common/utils/http-server-listen-promise'

function logServerListening(port: number) {
  const ownIps = getOwnIps()
  const http = ownIps.map(([iface, ip]) => `  http://${ip}:${port}/ \t[${iface}]`)
  const ws = ownIps.map(([iface, ip]) => `  ws://${ip}:${port}/ \t[${iface}]`)
  const msg = `HTTP server:\n${http.join('\n')}\nWS server:\n${ws.join('\n')}`
  console.log(msg)
}

export async function listen(port: number, koaApp, wssApp) {
  const server = createHttpWsServer(koaApp.callback(), wssApp)
  await httpServerListenPromise(server, port)
  logServerListening(port)
  return server
}

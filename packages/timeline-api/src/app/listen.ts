import { app } from './http.app'
import { wss } from './ws.app'
import { getOwnIps } from '../utils/get-own-ips'
import { createHttpWsServer } from '../utils/create-http-ws-server'
import { httpServerListenPromise } from '../utils/http-server-listen-promise'

function logServerListening(port: number) {
  const ownIps = getOwnIps()
  const http = ownIps.map(([iface, ip]) => `  http://${ip}:${port}/ \t[${iface}]`)
  const ws = ownIps.map(([iface, ip]) => `  ws://${ip}:${port}/ \t[${iface}]`)
  const msg = `HTTP server:\n${http.join('\n')}\nWS server:\n${ws.join('\n')}`
  console.log(msg)
}

export async function listen(port: number) {
  const server = createHttpWsServer(app.callback, wss)
  await httpServerListenPromise(server, port)
  logServerListening(port)
  return server
}

import * as WebSocket from 'ws'

export function createWsApp() {
  const wssOptions = { noServer: true }
  const wss = new WebSocket.Server(wssOptions)

  wss.on('connection', (ws) => {
    console.log('ws connection')

    ws.addEventListener('message', (event) => {
      console.log('ws message', event.data)
      ws.send(event.data)
    })

    ws.addEventListener('close', () => {
      console.log('ws close')
    })
  })
  return wss
}

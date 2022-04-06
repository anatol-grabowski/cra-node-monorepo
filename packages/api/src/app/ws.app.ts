import * as WebSocket from 'ws'

const wssOptions = { noServer: true }
export const wss = new WebSocket.Server(wssOptions)

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

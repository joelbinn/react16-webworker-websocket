import React from 'react'
import { useWebSocket } from './useWebSocket'
import { v4 as uuid } from 'uuid';

const WebSocketComponent: React.FC = () => {
  const [socket, setSocket] = React.useState<{ messages: string[], send: (m: string) => void }>({ messages: [], send: (m: string) => undefined })
  const wsP = useWebSocket<{ m: string }, { m: string }>('ws://demos.kaazing.com/echo')
  React.useEffect(() => {
    return () => {
       wsP.then(ws => ws.close())
         .catch(err => console.log('WS error:', err))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  wsP.then(ws => {
    setSocket(ms => ({ ...ms, send: (m: string) => ws.sendMessage({ m }) }))
    ws.receivedMessages.subscribe(m => {
      console.log(m)
      setSocket(ws => ({ ...ws, messages: [...ws.messages, `received '${JSON.stringify(m)}'`] }))
    })
  })

  return (
    <>
      <h1>Web socket</h1>
      <button onClick={() => socket.send(`msg#${uuid()}`)}>send</button>
      <div className="mt-sm App-alert">
        Messages from the server
        <ul>
          {socket.messages.map((m: string) => <li key={m}>{m}</li>)}
        </ul>
      </div>
    </>
  )
}

export default WebSocketComponent

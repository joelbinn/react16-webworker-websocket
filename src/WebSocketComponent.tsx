import React from 'react'
import { useWebSocket } from './useWebSocket'
import { v4 as uuid } from 'uuid';

const WebSocketComponent: React.FC = () => {
  function handleReceivedMessage(m: string) {
    setMessages(ms => [...ms, m])
  }

  function handleError(e: any) {
    console.log(e)
  }
  const [messages, setMessages] = React.useState<string[]>([])
  const ws = useWebSocket<string, string>('ws://demos.kaazing.com/echo')
  ws.setOnMessageReceived(handleReceivedMessage)
  ws.setOnError(handleError)

  return (
    <>
      <h1>Web socket</h1>
      <button onClick={() => ws.sendMessage(`msg#${uuid()}`)}>send</button>
      <div className="mt-sm App-alert">
        Messages from the server
        <ul>
          {messages.map((m: string) => <li key={m}>{m}</li>)}
        </ul>
      </div>
    </>
  )
}

export default WebSocketComponent

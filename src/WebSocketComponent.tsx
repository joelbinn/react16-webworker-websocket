import React from 'react'
import { useWebSocket } from './useWebSocket'

const WebSocketComponent: React.FC = () => {
  const [messages, setMessages] = React.useState<{ messages: string[], send: (m: string) => void }>({ messages: [], send: (m: string) => undefined })
  useWebSocket<{ m: string }, { m: string }>('ws://demos.kaazing.com/echo')
    .then(s => {
      setMessages(ms => ({ ...ms, send: (m: string) => s.sendMessage({ m }) }))
      s.receivedMessages.subscribe(m => {
        console.log(m)
        setMessages(ms => ({ ...ms, messages: [...ms.messages, `received '${JSON.stringify(m)}'`] }))
      })
    })
  return (
    <>
      <h1>Web socket</h1>
      <button onClick={() => messages.send(`kaka ${new Date()}`)}>send</button>
      <div className="mt-sm App-alert">
        Meddelanden från servern
        <ul>
          {messages.messages.map((m: string) => <li key={m}>{m}</li>)}
        </ul>
      </div>
    </>
  )
}

export default WebSocketComponent

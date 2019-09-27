import React from 'react'
import { Observable, ReplaySubject } from 'rxjs'

interface WebSocketConnection<Send, Receive> {
  sendMessage: (m: Send) => void,
  receivedMessages: Observable<Receive>
  close: () => void
}

export async function useWebSocket<S, R>(url: string, protocols?: string): Promise<WebSocketConnection<S, R>> {
  const subject = React.useMemo(() => new ReplaySubject<R>(1), [])
  const webSocket = React.useMemo(
    () => {
      console.log('Connecting to:', url)
      return new WebSocket(url, protocols)
    },
    [url, protocols]
  )
  webSocket.onmessage = (event: MessageEvent) => {
    const x = JSON.parse(event.data)
    console.log('event data:', event)
    subject.next(x)
  }
  webSocket.onerror = (err: any) => subject.error(err)
  const sender = new Promise<(m: S) => void>((resolve, reject) => {
    webSocket.onopen = () => {
      console.log('Connected to:', url)
      resolve((m: S) => {
        console.log('received message:', m)
        webSocket.send(JSON.stringify(m))
      })
    }
  })

  return sender.then(sendMessage => ({
    sendMessage,
    receivedMessages: subject.asObservable(),
    close: webSocket.close
  }))

}

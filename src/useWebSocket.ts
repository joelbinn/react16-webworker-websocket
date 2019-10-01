import React from 'react'

interface WebSocketConnection<Send, Receive> {
  sendMessage: (m: Send) => void,
  setOnMessageReceived: (onMessageReceived: (m: Receive) => void) => void
  setOnError: (onError: (e: any) => void) => void
  close: () => void
  connected: boolean
}

class WebSocketConnectionImpl<S, R> implements WebSocketConnection<S, R> {
  onMessageReceived = (m: R) => {

  }

  onError = (err: any) => {

  }

  sendMessage = (m: S) => {

  }

  close = () => {

  }

  connected = false

  readonly setOnMessageReceived = (onMessageReceived: (m: R) => void) =>
    this.onMessageReceived = onMessageReceived

  readonly setOnError = (onError: (err: any) => void) =>
    this.onError = onError
}

export function useWebSocket<S, R>(url: string, protocols?: string): WebSocketConnection<S, R> {
  const socketRef = React.useRef<WebSocket>()
  const connectionRef = React.useRef<WebSocketConnectionImpl<S, R>>(new WebSocketConnectionImpl<S, R>())

  React.useEffect(() => {
    const connection = connectionRef.current

    if (!socketRef.current) {
      console.log('Connecting to:', url)
      const webSocket = new WebSocket(url, protocols)
      webSocket.onerror = (e) => connection.onError(e)
      webSocket.onopen = () => {
        console.log('Connected to:', url)
        webSocket.onmessage = (event: MessageEvent) => {
          console.log('event data:', event)
          connection.onMessageReceived(event.data)
        }

        connectionRef.current.sendMessage = (m: S) => {
          console.log('received message:', m)
          webSocket.send(JSON.stringify(m))
        }

        connectionRef.current.close = () => {
          console.log(`Close connection to ${url}`)
          webSocket.close()
        }

        connectionRef.current.connected = false
      }
    }

    return () => {
      connection.connected = false
      connection.close()
    }
  }, [url, protocols])

  return connectionRef.current
}

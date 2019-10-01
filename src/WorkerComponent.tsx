import React from 'react'
import useWebWorker from './useWebWorker'
import './App.css'
import theWorker from './task'

const WorkerComponent: React.FC<{ className: string }> = ({ className }) => {
  function onMessage(e: MessageEvent) {
    console.log('Message from Worker', e)
    setMessage(message => [...message, `Result: ${e.data}`])
  }
  function startJob() {
    setMessage(message => [...message, `Starting the background job#${cnt}`])
    sendMessage(`Background job#${cnt}`)
    setCnt(cnt => cnt + 1);
  }
  const [cnt, setCnt] = React.useState(1)
  const [message, setMessage] = React.useState<string[]>([])
  const sendMessage = useWebWorker(theWorker, onMessage)

  return (
    <div className={className}>
      <h1>Web Worker</h1>
      <button onClick={startJob}>Start background task</button><br />
      <div className="mt-sm App-alert">
        Messages from background worker
        <ul>
          {message.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default WorkerComponent

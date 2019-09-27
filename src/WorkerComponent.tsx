import React from 'react'
import useWebWorker from './useWebWorker'
import './App.css'
import theWorker from './task'

const WorkerComponent: React.FC<{ className: string }> = ({ className }) => {
  function onMessage(e: MessageEvent) {
    console.log('Message from Worker', e)
    setMessage(message => [...message, `Svar: ${e.data}`])
  }
  function startJob() {
    setMessage(message => [...message, `Startar bakgrundsjobb#${cnt}`])
    sendMessage(`Bakgrundsjobb#${cnt}`)
    setCnt(cnt => cnt + 1);
  }
  const [cnt, setCnt] = React.useState(1)
  const [message, setMessage] = React.useState<string[]>([])
  const sendMessage = useWebWorker(theWorker, onMessage)

  return (
    <div className={className}>
      <h1>Web Worker</h1>
      <button onClick={startJob}>Starta arbete</button><br />
      <div className="mt-sm App-alert">
        Meddelanden från jobbartråden
        <ul>
          {message.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default WorkerComponent

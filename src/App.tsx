import React from 'react'
import './App.css'
import WorkerComponent from './WorkerComponent'
import WebSocketComponent from './WebSocketComponent'

const App: React.FC = () => {
  const [show, setShow] = React.useState(true)
  return (
    <div className="App">
      <header className="App-header">Testa Web Worker</header>
      <main className="App-main">
        <input className="m-sm" type="checkbox" checked={show} onChange={() => setShow(!show)} /> Visa jobbaren<br />
        {show ?
          <WorkerComponent className="m-sm" />
          :
          null
        }
        <hr/>
        <WebSocketComponent />
      </main>
    </div>
  );
}

export default App;

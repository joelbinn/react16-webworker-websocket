import React from 'react'

export default function useWebWorker(workerImplementation: any, onMessage: (e: MessageEvent) => void) {
  function createWorker(): Worker {
    console.log('Creating worker with code:\n', code)
    const blob = new Blob(['(' + code + ')()'])
    const worker = new Worker(URL.createObjectURL(blob))
    worker.addEventListener('message', onMessage)
    return worker
  }

  const code = workerImplementation.toString()
  const worker = React.useMemo(createWorker, [code])

  React.useEffect(() => {
    return () => {
      console.log('Terminating the worker')
      worker.terminate()
    }
  }, [worker])

  return (messageData: any) => worker.postMessage(messageData)
}

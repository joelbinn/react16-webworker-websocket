// This file must have worker types, but not DOM types.
// The global should be that of a service worker.

// This fixes `self`'s type.
declare var self: ServiceWorkerGlobalScope;
const worker = () => {
  self.addEventListener('message', (e: Event) => {
    console.log('Got a message:', (e as MessageEvent).data)
    // postMessage(`Nu börjar jag bakgrundsjobbet (${new Date()})`)
    setTimeout(
      () => {
        console.log(`Timed out for ${(e as MessageEvent).data}, posting...`)
        postMessage(`The background job is done for: ${(e as MessageEvent).data}`)
      },
      5000
    )
  })
}

export default worker

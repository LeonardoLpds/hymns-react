const syncStore = {}

self.addEventListener("install", (event) => {
  console.log("Service worker installed");
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activated");
});

self.addEventListener("sync", (event) => {
  console.log("sync added with: ", event);
  if (event.type && event.type == "sync") {
    const { url, options } = syncStore[event.tag]
    return event.waitUntil(sendStoredRequest(url, options));
  }
});

self.addEventListener("message", (event) => {
  if(event.data.type === 'sync') {
    const id = new Date().getTime()
    syncStore[id] = event.data
    self.registration.sync.register(id)
  }
});

async function sendStoredRequest(url, options) {
  console.log("called request to", url);
  console.log("with options", options);
  fetch(url, options);
}

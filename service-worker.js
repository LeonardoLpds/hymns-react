const syncStore = {};

self.addEventListener("install", (event) => {});

self.addEventListener("activate", (event) => {});

self.addEventListener("sync", async (event) => {
  if (event.type && event.type == "sync") {
    const { url, options } = syncStore[event.tag];
    delete syncStore[event.tag];

    event.waitUntil(
      fetch(url, options)
        .then(async (response) => {
          const channel = new BroadcastChannel("app-channel");
          if (response.ok) {
            channel.postMessage(await response.json());
          } else {
            channel.postMessage({
              errors: [{ msg: "Falha ao fazer o request " + event.tag }],
            });
          }
        })
        .catch((error) => {
          channel.postMessage({
            errors: [
              {
                msg: "Falha ao fazer o request " + event.tag,
                nestedErrors: error,
              },
            ],
          });
        })
    );
  }
});

self.addEventListener("message", (event) => {
  if (event.data.type === "sync") {
    const id = new Date().getTime();
    syncStore[id] = event.data;
    self.registration.sync.register(id);
  }
});

importScripts("sw-db.js");
importScripts("sw-cache.js");

const channel = new BroadcastChannel("app-channel");

self.addEventListener("install", (event) => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
  event.waitUntil(deleteOldCaches());
});

self.addEventListener("fetch", async (event) => {
  if (event.request.destination !== "" && event.request.method !== "POST") {
    event.respondWith(cacheFirst(event.request));
  }
});

self.addEventListener("sync", async (event) => {
  if (event.type && event.type == "sync") {
    const syncCall = async () => {
      let requests = await dbIndexGetAll("tries", IDBKeyRange.upperBound(2));
      await requests.map(async (request) => {
        const { url, options } = request;
        await fetchData(url, options)
          .then((data) => {
            channel.postMessage(data);
            dbRemove(request.key);
          })
          .catch((error) => {
            channel.postMessage(error);
            const payload = { ...request, tries: (request.tries += 1), error };
            dbPut(payload, request.key);
            if (payload.tries < 3) self.registration.sync.register(request.key);
          });
      });
    };
    event.waitUntil(syncCall());
  }
});

self.addEventListener("message", async (event) => {
  if (event.data.type === "sync") {
    const createSync = async () => {
      const key = new Date().getTime();
      const payload = { ...event.data, tries: 0 };
      await dbSet(payload, key);
      self.registration.sync.register(key);
      return key;
    };

    event.waitUntil(createSync());
  }
});

const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) return data;
    throw data;
  } catch (error) {
    throw {
      errors: [
        { msg: "Falha ao fazer o request", nestedErrors: error, url, options },
      ],
    };
  }
};

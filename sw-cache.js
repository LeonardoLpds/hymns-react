const cacheName = "cache_v1";

const putInCache = async (request, response) => {
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
};

const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) return responseFromCache;
  const responseFromNetwork = await fetch(request);
  if (responseFromNetwork.ok) {
    putInCache(request, responseFromNetwork.clone());
  }
  return responseFromNetwork;
};

const deleteCache = async (key) => {
  await caches.delete(key);
};

const deleteOldCaches = async () => {
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter((key) => key !== cacheName);
  await Promise.all(cachesToDelete.map(deleteCache));
};

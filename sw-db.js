const dbName = "requestDB";
const storeName = "requestStore";
const indexes = [{ name: "tries", field: "tries", options: { unique: false } }];

let db = undefined;

const openDb = async () => {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open(dbName, 1);
    dbRequest.onsuccess = (event) => resolve(event.target.result);
    dbRequest.onerror = (error) => reject(error);
    dbRequest.onupgradeneeded = (event) => {
      const idb = event.target.result;
      const tx = event.target.transaction;

      if (!idb.objectStoreNames.contains(storeName)) {
        idb.createObjectStore(storeName);
      }
      const store = tx.objectStore(storeName);

      indexes.forEach((index) => {
        if (!store.indexNames.contains(index.name)) {
          store.createIndex(index.name, index.field, index.options);
        }
      });

      resolve(idb);
    };
  });
};

openDb().then((r) => (db = r));

const dbSet = (item, key) => {
  return new Promise(async (resolve, reject) => {
    const store = await getStore();
    const request = store.add({ ...item, key }, key);
    request.onsuccess = () => resolve("Item created");
    request.onerror = (error) => reject(error);
  });
};

const dbPut = (item, key) => {
  return new Promise(async (resolve, reject) => {
    const store = await getStore();
    const request = store.put({ ...item, key }, key);
    request.onsuccess = () => resolve("Item updated");
    request.onerror = (error) => reject(error);
  });
};

const dbGet = (key) => {
  return new Promise(async (resolve, reject) => {
    const store = await getStore("readonly");
    const request = store.get(key);
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (error) => reject(error);
  });
};

const dbRemove = (key) => {
  return new Promise(async (resolve, reject) => {
    const store = await getStore();
    const request = store.delete(key);
    request.onsuccess = () => resolve("Item removed");
    request.onerror = (error) => reject(error);
  });
};

const dbGetAll = () => {
  return new Promise(async (resolve, reject) => {
    const store = await getStore("readonly");
    const request = store.getAll();
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (error) => reject(error);
  });
};

const dbIndexGetAll = (index, range) => {
  return new Promise(async (resolve, reject) => {
    const store = await getStore();
    const request = store.index(index).getAll(range);
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (error) => reject(error);
  });
};

const getStore = (mode = "readwrite") => {
  return new Promise(async (resolve, reject) => {
    if (!db) db = await openDb();
    const transaction = db.transaction(storeName, mode);
    transaction.onerror = (error) => {
      console.error("Error on getStore", error);
      reject(error);
    };
    resolve(transaction.objectStore(storeName));
  });
};

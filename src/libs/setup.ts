export const channel = () => new BroadcastChannel("app-channel");

export const messageCallback = (channel: BroadcastChannel) => {
  channel.onmessage = (message) => {
    if (message.data.error) {
      const storage = localStorage.getItem("requestFails");
      const requests = storage ? JSON.parse(storage) : [];
      requests.push(JSON.parse(message.data.error.options.body));
      localStorage.setItem("requestFails", JSON.stringify(requests));
    }
  };
};

export const initServiceworker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw")
      .then((worker) => {
        worker.addEventListener("updatefound", () => worker.installing);
      })
      .catch((error) => {
        console.error("Service worker registration failed: ", error);
      });
  }
};

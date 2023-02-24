export const channel = () => new BroadcastChannel("app-channel");

export const messageCallback = (channel: BroadcastChannel) => {
  channel.onmessage = (message) => {
    console.log("recebi a mensagem no app", "app-channel", message.data);
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

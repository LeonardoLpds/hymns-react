export const channel = () => new BroadcastChannel("app-channel");

export const messageCallback = (channel: BroadcastChannel) => {
  channel.onmessage = (e) => {
    console.log("recebi a mensagem no app", "app-channel", e);
  };
};

export const initServiceworker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker").catch((error) => {
      console.error("Service worker registration failed: ", error);
    });
  }
};

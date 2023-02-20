export default function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker")
        .then((registration) => {
          console.log("Service worker registered: ", registration);
        })
        .catch((error) => {
          console.error("Service worker registration failed: ", error);
        });
    });
  }
}

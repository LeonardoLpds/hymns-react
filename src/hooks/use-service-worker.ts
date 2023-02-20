export default function useServiceWorker() {
  const registerRequest = async (url: string) => {
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      const registration = (await navigator.serviceWorker.ready) as any;
      await registration.sync.register("send-request");
    }
  };

  return [registerRequest] as const;
}

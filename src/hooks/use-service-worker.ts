import { AxiosError } from "axios";

export default function useServiceWorker() {
  const registerRequest = async (error: AxiosError) => {
    console.log(error);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.controller!.postMessage({
        type: "sync",
        options: {
          headers: error.config?.headers,
          method: error.config?.method?.toUpperCase(),
          body: error.config?.data
        },
        url: error.config?.baseURL + error.config?.url!,
      });
    }
  };

  return [registerRequest] as const;
}

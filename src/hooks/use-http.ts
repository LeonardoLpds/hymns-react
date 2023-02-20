import { useState } from "react";
import axios from "../libs/axios";
import useServiceWorker from "./use-service-worker";

export default function useHttp() {
  const [loading, setLoading] = useState(false);
  const [registerRequest] = useServiceWorker();
  
  const request = (url: string) => {
    setLoading(true);
    axios
      .get(url)
      .then(response => console.log("request done", response.data))
      .catch((e) => registerRequest(url))
      .finally(() => setLoading(false));
  };

  return [request, loading] as const;
}

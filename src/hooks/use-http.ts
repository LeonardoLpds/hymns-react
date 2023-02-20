import { useState } from "react";
import axios from "../libs/axios";
import useServiceWorker from "./use-service-worker";

export default function useHttp() {
  const [loading, setLoading] = useState(false);
  const [registerRequest] = useServiceWorker();
  
  const request = (method: string, url: string, data?: any) => {
    setLoading(true);
    axios
      .request({url, method, data})
      .then(response => console.log("request done", response.data))
      .catch((e) => registerRequest(e))
      .finally(() => setLoading(false));
  };

  return [request, loading] as const;
}

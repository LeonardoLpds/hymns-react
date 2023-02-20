import { useState } from "react";
import axios from "../libs/axios";

export default function useHttp() {
  const [loading, setLoading] = useState(false);

  const request = (url: string) => {
    setLoading(true);
    axios.get(url).finally(() => setLoading(false));
  };

  return [request, loading] as const;
}

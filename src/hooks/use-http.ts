import { AxiosError } from "axios";
import { useReducer } from "react";
import axios from "../libs/axios";

type Status = "LOADING" | "DONE" | "ERROR" | "UNKNOW" | "STORED";
type State = { status: Status; data?: any; error?: any };
type Action = { type: Status; data?: any };

const initialState: State = {
  status: "UNKNOW",
  error: undefined,
  data: undefined,
};

export default function useHttp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const request = async (method: string, url: string, data?: any) => {
    dispatch({ type: "LOADING" });
    await axios
      .request({ url: url, method, data })
      .then((response) => dispatch({ type: "DONE", data: response.data }))
      .catch(async (error: AxiosError) => {
        try {
          const response = await errorHandler(error);
          dispatch({ type: "STORED", data: response });
        } catch {
          dispatch({ type: "ERROR", data: error.message });
        }
      });
  };

  return [state, request] as const;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "LOADING":
      return { ...initialState, status: action.type };
    case "DONE":
    case "STORED":
      return {
        ...initialState,
        status: action.type,
        data: action.data,
      };
    case "ERROR":
      return {
        ...initialState,
        status: action.type,
        error: action.data,
      };
    default:
      return state;
  }
}

async function errorHandler(axiosError: AxiosError) {
  const { headers, method, baseURL, url, data: body } = axiosError.config!;

  if (
    "serviceWorker" in navigator &&
    axiosError.code == "ERR_NETWORK" &&
    method?.toUpperCase() == "POST"
  ) {
    const sw = await navigator.serviceWorker.ready;
    if (!sw || !sw.active) throw axiosError;
    sw.active.postMessage({
      type: "sync",
      options: { method: method?.toUpperCase(), headers, body },
      url: baseURL + url!,
    });
    return { msg: "Request stored" };
  }
  throw axiosError;
}

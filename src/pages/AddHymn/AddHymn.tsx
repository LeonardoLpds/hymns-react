import { useRef } from "react";
import Spinner from "../../components/Spinner";
import useHttp from "../../hooks/use-http";

export default function AddHymn() {
  const [request, state] = useHttp();
  console.log(state);
  const inputRef = useRef<HTMLInputElement>(null);

  function postHymn(hymn: number) {
    request("POST", "/todo", { hymn: hymn });
  }

  return (
    <div className="form-field flex border rounded-lg items-stretch">
      <input
        className="input"
        type="text"
        inputMode="numeric"
        maxLength={3}
        max="480"
        pattern="[0-9]*"
        placeholder="Número do hino"
        ref={inputRef}
        required
      />
      <button
        className="button flex"
        onClick={() => postHymn(Number(inputRef.current?.value))}
        disabled={state.status == "LOADING"}
      >
        {state.status == "LOADING" && <Spinner />}
        Salvar
      </button>
    </div>
  );
}

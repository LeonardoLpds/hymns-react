import { useRef } from "react";
import Spinner from "../../components/Spinner";
import useHttp from "../../hooks/use-http";

export default function AddHymn() {
  const [request, loading] = useHttp();
  const inputRef = useRef<HTMLInputElement>(null);

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
        onClick={() =>
          request("POST", "/todo", { hymn: inputRef.current?.value })
        }
        disabled={loading}
      >
        {loading && <Spinner />}
        Salvar
      </button>
    </div>
  );
}

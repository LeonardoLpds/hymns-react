import { FormEvent, useEffect, useState } from "react";
import NumericInput from "../../components/NumericInput/NumericInput";
import Spinner from "../../components/Spinner/Spinner";
import useHttp from "../../hooks/use-http";

export default function AddHymn() {
  const [state, request] = useHttp();
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!dirty && ["DONE", "STORED"].includes(state.status)) setValue("");
  }, [state]);

  const errorHandler = (error: string) => setError(error);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!dirty) setDirty(true);
    setValue(event.target.value);
  };

  return (
    <form onSubmit={postHymn} className="w-full md:max-w-md">
      <div className="w-full form-field flex border rounded-lg items-stretch mb-2">
        <NumericInput
          min={1}
          max={480}
          maxLength={3}
          errorHandler={errorHandler}
          changeHandler={changeHandler}
          dirty={dirty}
          value={value}
          required
        />
        <button
          type="submit"
          className="button w-1/3"
          disabled={state.status == "LOADING" || error !== ""}
        >
          {state.status == "LOADING" ? <Spinner /> : "Salvar"}
        </button>
      </div>
      {error && <p className="text-red-400 text-xs absolute">{error}</p>}
      {!dirty && state.status == "ERROR" && (
        <p className="text-red-400 text-xs absolute">
          Houve um erro, por favor, tente novamente
        </p>
      )}
      {!dirty && state.status == "DONE" && (
        <p className="text-teal-400 text-xs absolute">Hino Salvo</p>
      )}
      {!dirty && state.status == "STORED" && (
        <p className="text-teal-400 text-xs absolute">
          Você está sem internet, o hino será enviado quando a internet estiver
          disponível
        </p>
      )}
    </form>
  );

  function postHymn(event: FormEvent) {
    event.preventDefault();
    setDirty(false);
    request("POST", "/hymn", {
      number: Number(value),
      timestamp: new Date().getTime(),
    });
  }
}

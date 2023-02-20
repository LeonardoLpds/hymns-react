import Spinner from "../../components/Spinner";
import useHttp from "../../hooks/use-http";

export default function AddHymn() {
  const [request, loading] = useHttp();

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
        required
      />
      <button
        className="button flex"
        onClick={() => request("/todo")}
        disabled={loading}
      >
        {loading && <Spinner />}
        Salvar
      </button>
    </div>
  );
}

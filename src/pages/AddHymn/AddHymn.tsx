export default function AddHymn() {
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
      <button className="button">Salvar</button>
    </div>
  );
}

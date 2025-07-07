export function RadioInputComponent({
  value,
  setValue,
  name,
  text,
  inputOptions,
}) {
  return (
    <div>
      <p className="font-semibold">{text}</p>
      {inputOptions &&
        inputOptions.map((i: string) => {
          return (
            <label className="mr-4" key={i}>
              <input
                type="radio"
                name={name}
                value={i}
                checked={value === i}
                onChange={(e) => setValue(e.target.value)}
                required
              />{' '}
              {i}
            </label>
          );
        })}
    </div>
  );
}

export function SelectInputComponent({ value, setValue, text, inputOptions }) {
  return (
    <div>
      <p className="font-semibold">{text}</p>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        className="w-full border p-1 rounded"
      >
        {inputOptions &&
          inputOptions.map((o: string) => {
            return (
              <option value={o} key={o}>
                {o}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export function TextAreaComponent({
  value,
  setValue,
  text,
  placeholder,
  loading,
}) {
  return (
    <div>
      <p className="font-semibold">{text}</p>
      <textarea
        name="value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 border rounded resize-none h-24"
        placeholder={placeholder}
        disabled={loading}
      />
    </div>
  );
}

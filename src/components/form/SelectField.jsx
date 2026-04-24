export default function SelectField({ label, name, register, options = [], error, className = "" }) {
  return (
    <div>
      {label && <label className="block text-sm mb-1">{label}</label>}
      <select
        {...(register ? register(name) : { name })}
        className={`border border-gray-300 w-full p-2 focus:outline-none focus:border-primary ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function Input({ name, placeholder, type = "text", register, error, defaultValue, className = "" }) {
  if (type === "submit") {
    return (
      <input
        type="submit"
        value={name}
        className={`py-2 px-8 bg-primary text-white cursor-pointer hover:bg-green-700 transition-colors w-full ${className}`}
      />
    );
  }
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...(register ? register(name) : {})}
        className={`py-2 px-3 border border-gray-300 w-full focus:outline-none focus:border-primary ${className}`}
      />
      {error && <p className="text-red text-xs mt-1">{error}</p>}
    </div>
  );
}

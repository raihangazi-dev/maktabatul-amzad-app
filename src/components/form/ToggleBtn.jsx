"use client";
export default function ToggleBtn({ show, setShow, name }) {
  return (
    <button
      type="button"
      onClick={() => setShow(!show)}
      className={`px-3 py-1 text-sm border rounded transition-colors ${
        show ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-300"
      }`}
    >
      {name}: {show ? "Show" : "Hide"}
    </button>
  );
}

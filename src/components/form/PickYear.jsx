"use client";
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 80 }, (_, i) => currentYear - i);

export default function PickYear({ selectedYear, setSelectedYear }) {
  return (
    <select
      value={selectedYear || ""}
      onChange={(e) => setSelectedYear(e.target.value)}
      className="border border-gray-300 py-1 px-3 focus:outline-none focus:border-primary"
    >
      <option value="">Select Year</option>
      {years.map((year) => (
        <option key={year} value={year}>{year}</option>
      ))}
    </select>
  );
}

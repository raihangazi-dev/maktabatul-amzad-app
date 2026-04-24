"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function SelectMultiple({ items = [], itemId, selected = [], setSelected, labelKey = "name" }) {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);

  const isSelected = (item) => selected.some((s) => s[itemId] === item[itemId]);

  const toggle = (item) => {
    if (isSelected(item)) {
      setSelected(selected.filter((s) => s[itemId] !== item[itemId]));
    } else {
      setSelected([...selected, item]);
    }
  };

  const getLabel = (item) => {
    const val = item[labelKey];
    if (Array.isArray(val)) return val[language] || val[1] || val[0] || "";
    return val || "";
  };

  return (
    <div className="relative">
      <div
        className="border border-gray-300 p-2 min-h-[38px] cursor-pointer flex flex-wrap gap-1"
        onClick={() => setOpen(!open)}
      >
        {selected.length === 0 && <span className="text-gray-400 text-sm">Select...</span>}
        {selected.map((item) => (
          <span
            key={item[itemId]}
            className="bg-primary text-white text-xs px-2 py-0.5 rounded flex items-center gap-1"
          >
            {getLabel(item)}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={(e) => { e.stopPropagation(); toggle(item); }}
            />
          </span>
        ))}
      </div>
      {open && (
        <div className="absolute z-10 bg-white border border-gray-300 w-full max-h-48 overflow-y-auto shadow-lg">
          {items.map((item) => (
            <div
              key={item[itemId]}
              onClick={() => toggle(item)}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm ${isSelected(item) ? "bg-green-50 text-primary font-medium" : ""}`}
            >
              {getLabel(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

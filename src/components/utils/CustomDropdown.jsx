import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function CustomDropdown({
  options = [],
  defaultValue,
  onChange,
  width = "w-40",
  fontSize = "text-sm", // ⬅️ tambahkan prop baru untuk atur ukuran font
}) {
  const [selected, setSelected] = useState(defaultValue || options[0]);
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    onChange?.(option);
  };

  return (
    <div className={`relative ${width}`}>
      {/* Tombol utama */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex justify-between items-center w-full bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-primary-light ${fontSize}`}
      >
        <span className="truncate">{selected}</span>
        <FiChevronDown
          className={`ml-2 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Daftar opsi */}
      {open && (
        <div className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg ${fontSize}`}>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 cursor-pointer ${
                option === selected
                  ? "bg-gray-100 text-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// src/components/utils/CustomDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function CustomDropdown({
  options = [],
  defaultValue,
  onChange,
  className = "",
  fontSize = "text-sm",
  label = "",
}) {
  const [selected, setSelected] = useState(defaultValue || options[0]);
  const [open, setOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    onChange?.(option);
  };

  // Calculate dropdown position
  useEffect(() => {
    if (open && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const dropdownHeight = Math.min(options.length * 44, 200); // Max 200px height
      const threshold = 80; // Extra padding for sensitivity

      // More aggressive: open upward if less than threshold
      if (spaceBelow < dropdownHeight + threshold) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
  }, [open, options.length]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className={`${className}`}>
      {label && (
        <label className="text-xs text-gray-600 mb-1 block">{label}</label>
      )}

      <div className="relative" ref={dropdownRef}>
        <button
          ref={buttonRef}
          onClick={() => setOpen(!open)}
          className={`flex justify-between items-center w-full bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-300 shadow-sm hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-primary-light ${fontSize}`}
        >
          <span className="truncate">{selected}</span>
          <FiChevronDown
            className={`ml-2 text-gray-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div 
            className={`absolute z-10 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-52 overflow-y-auto ${fontSize} ${
              dropdownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"
            }`}
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2 cursor-pointer ${
                  option === selected
                    ? "bg-gray-100 text-gray-700"
                    : "text-gray-600 hover:bg-gray-100"
                } ${index === 0 ? "rounded-t-xl" : ""} ${index === options.length - 1 ? "rounded-b-xl" : ""}`}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

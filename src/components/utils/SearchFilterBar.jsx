import React from "react";
import { FiSearch } from "react-icons/fi";
import CustomDropdown from "./CustomDropdown.jsx";

export default function SearchFilterBar({
  filters = [],
  onSearchChange,
  onFilterChange,
}) {
  return (
  <div className="bg-white shadow-sm rounded-xl p-4 flex flex-wrap items-center justify-center gap-4 mb-6 shadow-gray-300">
      {/* Search box */}
      <div className="relative w-full md:max-w-sm lg:max-w-md">
        <FiSearch
          className="
            absolute left-3 top-1/2 -translate-y-1/2 
            text-secondary
          "
        />
        <input
          type="text"
          placeholder="Search here..."
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="
            w-full border border-gray-300 rounded-[10px]
            pl-10 pr-4 py-2
            text-sm 
            focus:outline-none focus:ring-2 focus:ring-primary-light
          "
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap gap-3 md:gap-4">
        {filters.map((filter) => (
          <CustomDropdown
            key={filter.id}
            options={[filter.placeholder, ...filter.options]}
            defaultValue={filter.placeholder}
            onChange={(value) =>
              onFilterChange?.(
                filter.id,
                value === filter.placeholder ? "" : value
              )
            }
            width="w-[150px]"
            fontSize="text-sm"
          />
        ))}
      </div>
    </div>
  );
}

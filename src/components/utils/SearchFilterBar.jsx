// src/components/utils/SearchFilterBar.jsx
import React from "react";
import { FiSearch } from "react-icons/fi";
import CustomDropdown from "./CustomDropdown.jsx";
import AgeRangeSlider from "./AgeRangeSlider.jsx";
import ProbabilityRangeSlider from "./ProbabilityRangeSlider.jsx"; // ✅ FIX IMPORT


export default function SearchFilterBar({
  filters = [],
  onSearchChange,
  onFilterChange,
}) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 mb-6 shadow-gray-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        {/* SEARCH INPUT */}
        <div className="relative flex-1 min-w-[280px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search here..."
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        {/* FILTER AREA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-2">

          {filters.map((filter) => {
            
            // AGE SLIDER
            if (filter.id === "age") {
              return (
                <AgeRangeSlider
                  key="age-slider"
                  min={filter.minAge}
                  max={filter.maxAge}
                  onChange={({ min, max }) => {
                    onFilterChange("age_min", min);
                    onFilterChange("age_max", max);
                  }}
                />
              );
            }

            // PROBABILITY SLIDER (Score Slider)
            if (filter.id === "score") {
              return (
                <ProbabilityRangeSlider
                  key="prob-slider"
                  min={filter.min}
                  max={filter.max}
                  onChange={({ min, max }) => {
                    onFilterChange("score_min", min);
                    onFilterChange("score_max", max);
                  }}
                />
              );
            }

            // DROPDOWN DEFAULT
            return (
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
                width="w-full"
                fontSize="text-sm"
              />
            );
          })}

        </div>
      </div>
    </div>
  );
}

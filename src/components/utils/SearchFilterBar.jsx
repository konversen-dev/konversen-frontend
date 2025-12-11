// src/components/utils/SearchFilterBar.jsx
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import CustomDropdown from "./CustomDropdown.jsx";
import AgeRangeSlider from "./AgeRangeSlider.jsx";
import ProbabilityRangeSlider from "./ProbabilityRangeSlider.jsx"; // ✅ FIX IMPORT

// Wrapper component for Age Slider with state
function AgeSliderWrapper({ minAge, maxAge, onFilterChange }) {
  const [ageMin, setAgeMin] = useState(minAge);
  const [ageMax, setAgeMax] = useState(maxAge);
  
  return (
    <div className="flex flex-col">
      <label className="text-xs text-gray-600 mb-1">
        Age Range: {ageMin} - {ageMax}
      </label>
      <AgeRangeSlider
        min={minAge}
        max={maxAge}
        onChange={({ min, max }) => {
          setAgeMin(min);
          setAgeMax(max);
          onFilterChange("age_min", min);
          onFilterChange("age_max", max);
        }}
      />
    </div>
  );
}

// Wrapper component for Score Slider with state
function ScoreSliderWrapper({ min, max, onFilterChange }) {
  const [scoreMin, setScoreMin] = useState(min);
  const [scoreMax, setScoreMax] = useState(max);
  
  return (
    <div className="flex flex-col">
      <label className="text-xs text-gray-600 mb-1">
        Score Range: {scoreMin}% - {scoreMax}%
      </label>
      <ProbabilityRangeSlider
        min={min}
        max={max}
        onChange={({ min, max }) => {
          setScoreMin(min);
          setScoreMax(max);
          onFilterChange("score_min", min);
          onFilterChange("score_max", max);
        }}
      />
    </div>
  );
}

export default function SearchFilterBar({
  filters = [],
  onSearchChange,
  onFilterChange,
}) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 mb-6 shadow-gray-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        {/* SEARCH INPUT */}
        <div className="flex-1 min-w-[280px]">
          <label className="text-xs text-gray-600 mb-1 block">Search Lead Name</label>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="text"
              placeholder="Search here..."
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
          </div>
        </div>

        {/* FILTER AREA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-2">

          {filters.map((filter) => {
            
            // AGE SLIDER
            if (filter.id === "age") {
              return (
                <AgeSliderWrapper
                  key="age-slider"
                  minAge={filter.minAge}
                  maxAge={filter.maxAge}
                  onFilterChange={onFilterChange}
                />
              );
            }

            // PROBABILITY SLIDER (Score Slider)
            if (filter.id === "score") {
              return (
                <ScoreSliderWrapper
                  key="prob-slider"
                  min={filter.min}
                  max={filter.max}
                  onFilterChange={onFilterChange}
                />
              );
            }

            // DROPDOWN DEFAULT
            return (
              <CustomDropdown
                key={filter.id}
                label={filter.id === "job" ? "Job" : filter.id === "status" ? "Status" : filter.id}
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

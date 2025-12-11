import React, { useState, useEffect } from "react";
import { Range } from "react-range";

export default function ProbabilityRangeSlider({ min = 0, max = 100, onChange }) {
  const STEP = 1;

  const [values, setValues] = useState([min, max]);

  // Update jika parent mengirim min/max baru
  useEffect(() => {
    setValues([min, max]);
  }, [min, max]);

  return (
    <div
      className="
        w-full
        border border-gray-300 
        rounded-xl 
        bg-white
        px-4 py-3.5
        flex items-center
      "
    >
      <Range
        step={STEP}
        min={min}
        max={max}
        values={values}
        onChange={(newValues) => {
          setValues(newValues);
          onChange?.({
            min: newValues[0],
            max: newValues[1]
          });
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="w-full h-[6px] bg-gray-200 rounded-full"
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="
              h-3 w-3 
              bg-orange-500 
              rounded-full 
              shadow
            "
          />
        )}
      />
    </div>
  );
}

// Export getter function to get current values
export const getScoreRangeValues = (values) => `${values[0]}% - ${values[1]}%`;

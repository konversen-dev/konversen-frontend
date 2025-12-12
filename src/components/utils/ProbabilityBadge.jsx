import React from 'react';

/**
 * ProbabilityBadge Component
 * Visual indicator for lead probability/score with color coding
 * 
 * @param {number} score - The probability score (0-100)
 * @param {boolean} showLabel - Whether to show the percentage label (default: true)
 * @param {boolean} showText - Whether to show high/medium/low text (default: false)
 * @returns {JSX.Element}
 */
const ProbabilityBadge = ({ score, showLabel = true, showText = false }) => {
  // Determine color and category based on score
  const getScoreCategory = (value) => {
    if (value > 79) {
      return {
        color: 'bg-green-500',
        textColor: 'text-green-700',
        bgLight: 'bg-green-100',
        label: 'High',
      };
    } else if (value >= 40) {
      return {
        color: 'bg-yellow-500',
        textColor: 'text-yellow-700',
        bgLight: 'bg-yellow-100',
        label: 'Medium',
      };
    } else {
      return {
        color: 'bg-red-500',
        textColor: 'text-red-700',
        bgLight: 'bg-red-100',
        label: 'Low',
      };
    }
  };

  // Handle invalid score
  if (typeof score !== 'number' || isNaN(score)) {
    return (
      <span className="flex items-center gap-2 text-gray-500">
        <span className="w-2 h-2 rounded-full bg-gray-400"></span>
        {showLabel && 'N/A'}
      </span>
    );
  }

  const category = getScoreCategory(score);

  return (
    <span className="flex items-center gap-2">
      {/* Colored dot indicator */}
      <span className={`w-2.5 h-2.5 rounded-full ${category.color}`}></span>
      
      {/* Score percentage */}
      {showLabel && (
        <span className={`font-medium ${category.textColor}`}>
          {score}%
        </span>
      )}
      
      {/* Category text (optional) */}
      {showText && (
        <span className={`text-xs px-2 py-0.5 rounded-full ${category.bgLight} ${category.textColor}`}>
          {category.label}
        </span>
      )}
    </span>
  );
};

export default ProbabilityBadge;

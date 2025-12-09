import React from 'react';

const StatusBadge = ({ status, labelOverride }) => {
  const colorMap = {
    pending: 'bg-yellow-400',
    contacted: 'bg-blue-400',
    converted: 'bg-green-500',
    failed: 'bg-red-500',
    active: 'bg-green-600',
    completed:'bg-red-600',
  };

  const labelMap = {
    pending: 'Pending',
    contacted: 'Contacted',
    converted: 'Converted',
    failed: 'Failed',
    active: 'Active',
    completed: 'Completed',
  };

  const key = (status || '').toLowerCase();
  const dotColor = colorMap[key] || 'bg-gray-400';
  const label = labelOverride || labelMap[key] || status;

  return (
    <span className="flex items-center gap-2 text-gray-600">
      <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
      {label}
    </span>
  );
};

export default StatusBadge;


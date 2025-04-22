import React from 'react';

export default function CommissionBadge({ percentage, isRecurring }) {
  if (!percentage) return null;
  
  let bgColor = 'bg-gray-100 text-gray-700';
  let label = `${percentage}%`;
  
  // Determine badge color based on percentage
  if (percentage >= 50) {
    bgColor = 'bg-green-100 text-green-800';
  } else if (percentage >= 30) {
    bgColor = 'bg-blue-100 text-blue-800';
  } else if (percentage >= 20) {
    bgColor = 'bg-yellow-100 text-yellow-800';
  }
  
  // Add a "recurring" indicator if applicable
  if (isRecurring) {
    label = `${percentage}% recurring`;
    bgColor = 'bg-purple-100 text-purple-800'; // Special color for recurring commissions
  }
  
  return (
    <div className={`${bgColor} px-2 py-1 rounded-full text-xs font-medium`}>
      {label}
    </div>
  );
}
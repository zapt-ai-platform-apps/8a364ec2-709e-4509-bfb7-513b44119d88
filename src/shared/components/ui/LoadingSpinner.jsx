import React from 'react';

export default function LoadingSpinner({ size = 'default' }) {
  const sizeClasses = {
    small: 'h-8 w-8 border-t-2 border-b-2',
    default: 'h-12 w-12 border-t-4 border-b-4',
    large: 'h-16 w-16 border-t-4 border-b-4',
  };
  
  return (
    <div className="flex justify-center items-center py-12">
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-primary-600`}></div>
    </div>
  );
}
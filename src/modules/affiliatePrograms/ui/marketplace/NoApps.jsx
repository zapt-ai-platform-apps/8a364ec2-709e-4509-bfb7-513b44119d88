import React from 'react';

export default function NoApps({ type, onClearSearch }) {
  if (type === 'empty') {
    return (
      <div className="bg-white rounded-xl shadow-soft p-8 text-center max-w-2xl mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-secondary-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h2 className="text-2xl font-semibold text-secondary-800 mb-4">No apps available yet</h2>
        <p className="text-secondary-600">
          Check back soon! We're currently reviewing new apps to add to our marketplace.
        </p>
      </div>
    );
  }
  
  if (type === 'noMatches') {
    return (
      <div className="bg-white rounded-xl shadow-soft p-8 text-center max-w-2xl mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-secondary-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-semibold text-secondary-800 mb-4">No matching apps found</h2>
        <p className="text-secondary-600 mb-6">
          Try adjusting your search terms or filters to see more results.
        </p>
        <button
          onClick={onClearSearch}
          className="px-6 py-3 bg-primary-600 text-white rounded-md cursor-pointer hover:bg-primary-700 transition-colors font-medium"
        >
          Clear All Filters
        </button>
      </div>
    );
  }
}
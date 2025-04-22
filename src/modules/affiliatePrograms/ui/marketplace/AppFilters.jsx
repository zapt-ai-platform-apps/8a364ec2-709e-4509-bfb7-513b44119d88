import React from 'react';

export default function AppFilters({ 
  filters, 
  onFilterChange, 
  sortOption, 
  onSortChange,
  totalCount,
  filteredCount
}) {
  const handleFilterToggle = (filterKey) => {
    onFilterChange({
      ...filters,
      [filterKey]: !filters[filterKey]
    });
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-100 overflow-hidden sticky top-20">
      <div className="p-4 border-b border-secondary-100">
        <h2 className="text-lg font-semibold text-secondary-900">Filters</h2>
        <p className="text-secondary-500 text-sm">
          Showing {filteredCount} of {totalCount} apps
        </p>
      </div>
      
      <div className="p-4 border-b border-secondary-100">
        <h3 className="text-sm font-medium text-secondary-800 mb-3">Commission Type</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="filter-recurring"
              type="checkbox"
              checked={filters.recurring}
              onChange={() => handleFilterToggle('recurring')}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded cursor-pointer"
            />
            <label htmlFor="filter-recurring" className="ml-2 text-sm text-secondary-700 cursor-pointer">
              Recurring Commission
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="filter-high-commission"
              type="checkbox"
              checked={filters.highCommission}
              onChange={() => handleFilterToggle('highCommission')}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded cursor-pointer"
            />
            <label htmlFor="filter-high-commission" className="ml-2 text-sm text-secondary-700 cursor-pointer">
              High Commission (30%+)
            </label>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-sm font-medium text-secondary-800 mb-3">Sort By</h3>
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-secondary-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md cursor-pointer box-border"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
      
      {(filters.recurring || filters.highCommission) && (
        <div className="p-4 bg-secondary-50 border-t border-secondary-100">
          <button
            onClick={() => onFilterChange({ recurring: false, highCommission: false })}
            className="text-primary-600 hover:text-primary-800 text-sm font-medium cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
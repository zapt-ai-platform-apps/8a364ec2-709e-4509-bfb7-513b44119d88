import React from 'react';

export default function AppFilters({ 
  filters, 
  onFilterChange, 
  sortOption, 
  onSortChange, 
  totalCount, 
  filteredCount,
  showFavoritesFilter = false,
  isLoadingUser = false
}) {
  const handleFilterChange = (filterName) => {
    onFilterChange({
      ...filters,
      [filterName]: !filters[filterName]
    });
  };

  return (
    <div className="bg-white shadow-soft rounded-xl p-6 sticky top-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-secondary-900 mb-1">Filters</h2>
        <p className="text-secondary-500 text-sm">
          Showing {filteredCount} of {totalCount} apps
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-secondary-800 mb-3">Sort By</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onSortChange('newest')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors cursor-pointer ${
                sortOption === 'newest' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => onSortChange('oldest')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors cursor-pointer ${
                sortOption === 'oldest' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              Oldest
            </button>
            <button
              onClick={() => onSortChange('alphabetical')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors cursor-pointer ${
                sortOption === 'alphabetical' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              A-Z
            </button>
          </div>
        </div>
        
        <hr className="border-secondary-200" />
        
        <div>
          <h3 className="font-medium text-secondary-800 mb-3">Commission Type</h3>
          <label className="flex items-center mb-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
              checked={filters.recurring}
              onChange={() => handleFilterChange('recurring')}
            />
            <span className="ml-2 text-secondary-700">Recurring Commission</span>
          </label>
          
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
              checked={filters.highCommission}
              onChange={() => handleFilterChange('highCommission')}
            />
            <span className="ml-2 text-secondary-700">High Commission (30%+)</span>
          </label>
        </div>
        
        {showFavoritesFilter && !isLoadingUser && (
          <>
            <hr className="border-secondary-200" />
            
            <div>
              <h3 className="font-medium text-secondary-800 mb-3">My Favorites</h3>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                  checked={filters.onlyFavorites}
                  onChange={() => handleFilterChange('onlyFavorites')}
                />
                <span className="ml-2 text-secondary-700">Show only my favorites</span>
              </label>
            </div>
          </>
        )}
        
        <hr className="border-secondary-200" />
        
        <button
          onClick={() => onFilterChange({
            recurring: false,
            highCommission: false,
            onlyFavorites: false
          })}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium cursor-pointer"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
}
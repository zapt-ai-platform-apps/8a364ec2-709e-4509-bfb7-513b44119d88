import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock helpers for testing favorite functionality
function filterFavorites(apps, favorites, filters) {
  return apps.filter(app => {
    if (!filters.onlyFavorites) return true;
    return favorites.some(favId => Number(favId) === Number(app.id));
  });
}

describe('Favorites Filtering', () => {
  let mockApps;
  let mockFavorites;
  
  beforeEach(() => {
    // Setup test data
    mockApps = [
      { id: 1, name: 'App 1' },
      { id: 2, name: 'App 2' },
      { id: 3, name: 'App 3' },
      { id: '4', name: 'App 4' }, // String ID to test type conversion
    ];
    
    // Mix of string and number IDs to test type conversion
    mockFavorites = [1, '3', 4];
  });
  
  it('should show all apps when favorites filter is off', () => {
    const filters = { onlyFavorites: false };
    const result = filterFavorites(mockApps, mockFavorites, filters);
    
    expect(result).toHaveLength(4);
    expect(result).toEqual(mockApps);
  });
  
  it('should only show favorited apps when filter is on', () => {
    const filters = { onlyFavorites: true };
    const result = filterFavorites(mockApps, mockFavorites, filters);
    
    expect(result).toHaveLength(3);
    expect(result.map(app => app.id)).toEqual(expect.arrayContaining([1, 3, '4']));
    expect(result.map(app => app.id)).not.toEqual(expect.arrayContaining([2]));
  });
  
  it('should handle type mismatches between app IDs and favorites', () => {
    const filters = { onlyFavorites: true };
    // Add another app with string ID matching a number in favorites
    mockApps.push({ id: '1', name: 'App 1 String' });
    
    const result = filterFavorites(mockApps, mockFavorites, filters);
    
    // Should match both numeric 1 and string '1'
    expect(result.some(app => app.id === 1)).toBeTruthy();
    expect(result.some(app => app.id === '1')).toBeTruthy();
  });
  
  it('should return empty array when no favorites match', () => {
    const filters = { onlyFavorites: true };
    const emptyFavorites = [];
    
    const result = filterFavorites(mockApps, emptyFavorites, filters);
    
    expect(result).toHaveLength(0);
  });
});
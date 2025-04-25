import {
  getAllApps,
  getAppsByStatus,
  getMyApps,
  getPendingApps,
  submitApp,
  reviewApp,
  getFavorites,
  toggleFavorite,
  deleteApp
} from './internal/services';

// Public API for the affiliate programs module
export const api = {
  getAllApps,
  getAppsByStatus,
  getMyApps,
  getPendingApps,
  submitApp,
  reviewApp,
  getFavorites,
  toggleFavorite,
  deleteApp
};
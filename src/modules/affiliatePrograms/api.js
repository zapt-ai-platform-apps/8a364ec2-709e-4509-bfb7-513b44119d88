import * as services from './internal/services';

export const api = {
  getAllApps: services.getAllApps,
  getAppsByStatus: services.getAppsByStatus,
  getMyApps: services.getMyApps,
  getPendingApps: services.getPendingApps,
  submitApp: services.submitApp,
  reviewApp: services.reviewApp,
  getFavorites: services.getFavorites,
  toggleFavorite: services.toggleFavorite,
  deleteApp: services.deleteApp
};
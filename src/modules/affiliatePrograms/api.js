import * as services from './internal/services.js';
import { validateApp } from './validators.js';
import * as ui from './ui/index.js';

/**
 * Public API for the affiliatePrograms module
 */
export const api = {
  // UI Components
  ui,
  
  /**
   * Get all approved apps for the marketplace
   */
  getApprovedApps: async () => {
    const apps = await services.getApprovedApps();
    return { apps };
  },

  /**
   * Get all pending apps for admin review
   */
  getPendingApps: async (user) => {
    if (!user) {
      throw new Error('User is required');
    }
    
    // Check admin privileges
    if (!user.email?.endsWith('@zapt.ai') && !user.email?.endsWith('@mapt.events')) {
      throw new Error('Not authorized to access pending apps');
    }
    
    const apps = await services.getPendingApps();
    return { apps };
  },

  /**
   * Get all apps submitted by a specific user
   */
  getUserApps: async (user) => {
    if (!user) {
      throw new Error('User is required');
    }
    
    const apps = await services.getUserApps(user.id);
    return { apps };
  },

  /**
   * Submit a new affiliate app
   */
  submitApp: async (user, appData) => {
    if (!user) {
      throw new Error('User is required');
    }
    
    const app = await services.submitApp(user, appData);
    return { 
      message: 'App submitted successfully',
      app: validateApp(app, {
        actionName: 'submitApp',
        location: 'affiliatePrograms/api.js',
        direction: 'outgoing',
        moduleFrom: 'affiliatePrograms',
        moduleTo: 'client'
      })
    };
  },

  /**
   * Review (approve or reject) an app
   */
  reviewApp: async (user, appId, status) => {
    if (!user) {
      throw new Error('User is required');
    }
    
    const app = await services.reviewApp(user, appId, status);
    return { 
      message: `App ${status} successfully`,
      app: validateApp(app, {
        actionName: 'reviewApp',
        location: 'affiliatePrograms/api.js',
        direction: 'outgoing',
        moduleFrom: 'affiliatePrograms',
        moduleTo: 'client'
      })
    };
  }
};
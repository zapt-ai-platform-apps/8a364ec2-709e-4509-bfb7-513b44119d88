import * as services from './internal/services.js';
import { validateProgram } from './validators.js';
import * as ui from './ui/index.js';

/**
 * Public API for the affiliatePrograms module
 */
export const api = {
  // UI Components
  ui,
  
  /**
   * Get all approved programs for the marketplace
   */
  getApprovedPrograms: async () => {
    const programs = await services.getApprovedPrograms();
    return { programs };
  },

  /**
   * Get all pending programs for admin review
   */
  getPendingPrograms: async (user) => {
    if (!user) {
      throw new Error('User is required');
    }
    
    // Check admin privileges
    if (!user.email?.endsWith('@zapt.ai') && !user.email?.endsWith('@mapt.events')) {
      throw new Error('Not authorized to access pending programs');
    }
    
    const programs = await services.getPendingPrograms();
    return { programs };
  },

  /**
   * Get all programs submitted by a specific user
   */
  getUserPrograms: async (user) => {
    if (!user) {
      throw new Error('User is required');
    }
    
    const programs = await services.getUserPrograms(user.id);
    return { programs };
  },

  /**
   * Submit a new affiliate program
   */
  submitProgram: async (user, programData) => {
    if (!user) {
      throw new Error('User is required');
    }
    
    const program = await services.submitProgram(user, programData);
    return { 
      message: 'Program submitted successfully',
      program: validateProgram(program, {
        actionName: 'submitProgram',
        location: 'affiliatePrograms/api.js',
        direction: 'outgoing',
        moduleFrom: 'affiliatePrograms',
        moduleTo: 'client'
      })
    };
  },

  /**
   * Review (approve or reject) a program
   */
  reviewProgram: async (user, programId, status) => {
    if (!user) {
      throw new Error('User is required');
    }
    
    const program = await services.reviewProgram(user, programId, status);
    return { 
      message: `Program ${status} successfully`,
      program: validateProgram(program, {
        actionName: 'reviewProgram',
        location: 'affiliatePrograms/api.js',
        direction: 'outgoing',
        moduleFrom: 'affiliatePrograms',
        moduleTo: 'client'
      })
    };
  }
};
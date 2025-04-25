import { initializeZapt } from '@zapt/zapt-js';
import Sentry from '../shared/sentry.js';

export const customerSupportService = {
  /**
   * Get customer support chat credentials
   */
  getChatCredentials: async (email) => {
    if (!email) {
      throw new Error('Missing email');
    }
    
    const APP_ID = process.env.VITE_PUBLIC_APP_ID;
    if (!APP_ID) {
      throw new Error('Missing VITE_PUBLIC_APP_ID environment variable');
    }
    
    const zaptSecretKey = process.env.ZAPT_SECRET_KEY;
    if (!zaptSecretKey) {
      throw new Error('Missing ZAPT_SECRET_KEY environment variable');
    }
    
    const { customerSupport } = initializeZapt(APP_ID);
    return customerSupport(email, zaptSecretKey);
  }
};
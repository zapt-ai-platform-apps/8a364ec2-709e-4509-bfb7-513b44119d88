import * as Sentry from "@sentry/browser";
import { supabase } from '@/shared/services/supabase';

/**
 * Get all approved affiliate apps
 */
export const getAllApps = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch('/api/getApps', {
      headers: {
        Authorization: `Bearer ${session?.access_token}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to fetch apps: ${errorData.error || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching apps:', error);
    Sentry.captureException(error);
    throw error;
  }
};

/**
 * Get apps by status
 */
export const getAppsByStatus = async (status) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch(`/api/getApps?status=${status}`, {
      headers: {
        Authorization: `Bearer ${session?.access_token}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to fetch apps with status ${status}: ${errorData.error || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching apps with status ${status}:`, error);
    Sentry.captureException(error);
    throw error;
  }
};

/**
 * Get current user's apps
 */
export const getMyApps = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch('/api/getMyApps', {
      headers: {
        Authorization: `Bearer ${session?.access_token}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to fetch user apps: ${errorData.error || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user apps:', error);
    Sentry.captureException(error);
    throw error;
  }
};

/**
 * Get pending apps (for admins)
 */
export const getPendingApps = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch('/api/getPendingApps', {
      headers: {
        Authorization: `Bearer ${session?.access_token}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to fetch pending apps: ${errorData.error || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching pending apps:', error);
    Sentry.captureException(error);
    throw error;
  }
};

/**
 * Submit a new affiliate app
 */
export const submitApp = async (appData) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch('/api/submitApp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`
      },
      body: JSON.stringify(appData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to submit app: ${errorData.error || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting app:', error);
    Sentry.captureException(error);
    throw error;
  }
};

/**
 * Review an app (approve/reject)
 */
export const reviewApp = async (appId, approved) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch('/api/reviewApp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`
      },
      body: JSON.stringify({ appId, approved })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to review app: ${errorData.error || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error reviewing app:', error);
    Sentry.captureException(error);
    throw error;
  }
};

/**
 * Get user's favorite apps
 */
export const getFavorites = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch('/api/getFavorites', {
      headers: {
        Authorization: `Bearer ${session?.access_token}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to fetch favorites: ${errorData.error || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching favorites:', error);
    Sentry.captureException(error);
    throw error;
  }
};

/**
 * Toggle favorite status for an app
 */
export const toggleFavorite = async (appId) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch('/api/toggleFavorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`
      },
      body: JSON.stringify({ appId })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to toggle favorite: ${errorData.error || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error toggling favorite:', error);
    Sentry.captureException(error);
    throw error;
  }
};
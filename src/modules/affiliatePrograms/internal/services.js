import { supabase } from '@/shared/services/supabase';
import * as Sentry from '@sentry/browser';

export async function initialize() {
  console.log('Affiliate programs module initialized');
  return { success: true };
}

export async function getAllApps() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch('/api/getApps', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch apps');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching apps:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function getAppsByStatus(status) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch(`/api/getApps?status=${status}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `Failed to fetch ${status} apps`);
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching ${status} apps:`, error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function getMyApps() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch('/api/getMyApps', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch your apps');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching your apps:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function getPendingApps() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch('/api/getPendingApps', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch pending apps');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching pending apps:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function submitApp(appData) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch('/api/submitApp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify(appData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit app');
    }
    
    return data;
  } catch (error) {
    console.error('Error submitting app:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function reviewApp(appId, status, feedback) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch('/api/reviewApp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ appId, status, feedback }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to review app');
    }
    
    return data;
  } catch (error) {
    console.error('Error reviewing app:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function getFavorites() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch('/api/getFavorites', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch favorites');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function toggleFavorite(appId) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch('/api/toggleFavorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ appId }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to toggle favorite');
    }
    
    return data;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function deleteApp(appId) {
  try {
    console.log('Attempting to delete app with ID:', appId);
    const { data: { session } } = await supabase.auth.getSession();
    
    // Fix: use proper URL structure for DELETE request with query parameters
    const url = `/api/deleteApp?appId=${encodeURIComponent(appId)}`;
    console.log('Sending delete request to:', url);
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    // Fix: Only parse the response once and then check status
    const data = await response.json();
    console.log('Delete app response:', data);
    
    if (!response.ok) {
      console.error('Server returned error:', data);
      throw new Error(data.error || 'Failed to delete app');
    }
    
    return data;
  } catch (error) {
    console.error('Error deleting app:', error);
    Sentry.captureException(error);
    throw error;
  }
}
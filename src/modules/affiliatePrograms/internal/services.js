import * as Sentry from "@sentry/browser";
import { supabase } from '@/shared/services/supabase';

export async function getAllApps() {
  try {
    const response = await fetch('/api/getApps');
    
    if (!response.ok) {
      throw new Error('Failed to fetch apps');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching apps:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function getAppsByStatus(status) {
  try {
    const response = await fetch(`/api/getApps?status=${status}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch apps with status: ${status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching apps with status ${status}:`, error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function getMyApps() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch('/api/getMyApps', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch your apps');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user apps:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function getPendingApps() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch('/api/getPendingApps', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch pending apps');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching pending apps:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function submitApp(appData) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch('/api/submitApp', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to submit app');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting app:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function reviewApp(appId, status, feedbackNote) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch('/api/reviewApp', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ appId, status, feedbackNote }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to review app');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error reviewing app:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function getFavorites() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch('/api/getFavorites', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch favorites');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching favorites:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function toggleFavorite(appId) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch('/api/toggleFavorite', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ appId }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to toggle favorite');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error toggling favorite:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function deleteApp(appId) {
  try {
    console.log('Deleting app with ID:', appId);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(`/api/deleteApp?appId=${appId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete app');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting app:', error);
    Sentry.captureException(error);
    throw error;
  }
}
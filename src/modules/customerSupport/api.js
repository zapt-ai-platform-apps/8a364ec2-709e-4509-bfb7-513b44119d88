import { validateChatRequest } from './validators';

export const api = {
  initializeChat: async (email) => {
    try {
      // Validate input
      validateChatRequest({ email }, {
        actionName: 'initializeChat',
        location: 'customerSupport/api.js',
        direction: 'outgoing',
        moduleFrom: 'customerSupport',
        moduleTo: 'server'
      });
      
      const response = await fetch('/api/customerSupport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to initialize chat');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error initializing chat:', error);
      throw error;
    }
  }
};
import { api } from './_affiliateApps.js';
import { authenticateUser } from "./_apiUtils.js";
import Sentry from "./_sentry.js";

export default async function handler(req, res) {
  console.log('Submit app request received:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);
    
    const appData = req.body;
    console.log('App data received:', appData);
    
    const result = await api.submitApp(user, appData);
    console.log('App submitted successfully:', result.app);
    
    return res.status(201).json(result);
    
  } catch (error) {
    console.error('Error submitting app:', error);
    Sentry.captureException(error);
    
    if (error.message.includes('Validation failed')) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(500).json({ error: 'Failed to submit app' });
  }
}
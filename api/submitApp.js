import { affiliateAppsService } from './affiliateApps/service.js';
import { authenticateUser } from "./shared/auth.js";
import Sentry from "./shared/sentry.js";

export default async function handler(req, res) {
  console.log('Submit app request received:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);
    
    // Create a copy of the request body and explicitly remove the id field
    const appData = { ...req.body };
    delete appData.id; // Remove id field if present - it's auto-generated
    console.log('App data received (cleaned):', appData);
    
    if (!user.id) {
      console.error('Missing user ID after authentication');
      return res.status(400).json({ error: 'User ID is required but not available' });
    }
    
    const result = await affiliateAppsService.submitApp(user, appData);
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
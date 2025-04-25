import { affiliateAppsService } from './services/affiliateApps/index.js';
import { authenticateUser } from "./utils/auth.js";
import Sentry from "./utils/sentry.js";

export default async function handler(req, res) {
  console.log('Review app request received');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);
    
    const { appId, status } = req.body;
    
    if (!appId || !status) {
      return res.status(400).json({ error: 'Missing appId or status' });
    }
    
    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({ error: 'Status must be approved or rejected' });
    }
    
    const result = await affiliateAppsService.reviewApp(user, appId, status);
    console.log(`App ${appId} reviewed with status: ${status}`);
    
    return res.status(200).json(result);
    
  } catch (error) {
    console.error('Error reviewing app:', error);
    Sentry.captureException(error);
    
    if (error.message === 'Not authorized to review apps') {
      return res.status(403).json({ error: error.message });
    }
    
    if (error.message === 'App not found') {
      return res.status(404).json({ error: error.message });
    }
    
    if (error.message.includes('Validation failed')) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(500).json({ error: 'Failed to review app' });
  }
}
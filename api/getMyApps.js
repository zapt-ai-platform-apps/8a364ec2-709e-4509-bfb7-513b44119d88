import { affiliateAppsService } from './services/affiliateApps/index.js';
import { authenticateUser } from "./utils/auth.js";
import Sentry from "./utils/sentry.js";

export default async function handler(req, res) {
  console.log('Get my apps request received');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);
    
    const result = await affiliateAppsService.getUserApps(user);
    console.log(`Retrieved ${result.apps.length} apps for user ${user.id}`);
    
    return res.status(200).json(result);
    
  } catch (error) {
    console.error('Error fetching user apps:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Failed to fetch apps' });
  }
}
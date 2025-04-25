import { affiliateAppsService } from './services/affiliateApps/index.js';
import Sentry from "./utils/sentry.js";

export default async function handler(req, res) {
  console.log('Get apps request received');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const result = await affiliateAppsService.getApprovedApps();
    console.log(`Retrieved ${result.apps.length} approved apps`);
    
    return res.status(200).json(result);
    
  } catch (error) {
    console.error('Error fetching apps:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Failed to fetch apps' });
  }
}
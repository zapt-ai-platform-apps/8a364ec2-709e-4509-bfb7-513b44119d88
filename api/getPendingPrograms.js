import { api } from '../src/modules/affiliatePrograms/api.js';
import { authenticateUser } from "./_apiUtils.js";
import Sentry from "./_sentry.js";

export default async function handler(req, res) {
  console.log('Get pending programs request received');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);
    
    const result = await api.getPendingPrograms(user);
    console.log(`Retrieved ${result.programs.length} pending programs`);
    
    return res.status(200).json(result);
    
  } catch (error) {
    console.error('Error fetching pending programs:', error);
    Sentry.captureException(error);
    
    if (error.message === 'Not authorized to access pending programs') {
      return res.status(403).json({ error: error.message });
    }
    
    return res.status(500).json({ error: 'Failed to fetch pending programs' });
  }
}
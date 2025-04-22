import { api } from './_affiliatePrograms.js';
import { authenticateUser } from "./_apiUtils.js";
import Sentry from "./_sentry.js";

export default async function handler(req, res) {
  console.log('Get my programs request received');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);
    
    const result = await api.getUserPrograms(user);
    console.log(`Retrieved ${result.programs.length} programs for user ${user.id}`);
    
    return res.status(200).json(result);
    
  } catch (error) {
    console.error('Error fetching user programs:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Failed to fetch programs' });
  }
}
import { api } from './_affiliatePrograms.js';
import Sentry from "./_sentry.js";

export default async function handler(req, res) {
  console.log('Get programs request received');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const result = await api.getApprovedPrograms();
    console.log(`Retrieved ${result.programs.length} approved programs`);
    
    return res.status(200).json(result);
    
  } catch (error) {
    console.error('Error fetching programs:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Failed to fetch programs' });
  }
}
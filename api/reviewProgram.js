import { api } from '../src/modules/affiliatePrograms/api.js';
import { authenticateUser } from "./_apiUtils.js";
import Sentry from "./_sentry.js";

export default async function handler(req, res) {
  console.log('Review program request received');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);
    
    const { programId, status } = req.body;
    
    if (!programId || !status) {
      return res.status(400).json({ error: 'Missing programId or status' });
    }
    
    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({ error: 'Status must be approved or rejected' });
    }
    
    const result = await api.reviewProgram(user, programId, status);
    console.log(`Program ${programId} reviewed with status: ${status}`);
    
    return res.status(200).json(result);
    
  } catch (error) {
    console.error('Error reviewing program:', error);
    Sentry.captureException(error);
    
    if (error.message === 'Not authorized to review programs') {
      return res.status(403).json({ error: error.message });
    }
    
    if (error.message === 'Program not found') {
      return res.status(404).json({ error: error.message });
    }
    
    if (error.message.includes('Validation failed')) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(500).json({ error: 'Failed to review program' });
  }
}
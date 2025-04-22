import { api } from '../src/modules/affiliatePrograms/api.js';
import { authenticateUser } from "./_apiUtils.js";
import Sentry from "./_sentry.js";

export default async function handler(req, res) {
  console.log('Submit program request received:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);
    
    const programData = req.body;
    console.log('Program data received:', programData);
    
    const result = await api.submitProgram(user, programData);
    console.log('Program submitted successfully:', result.program);
    
    return res.status(201).json(result);
    
  } catch (error) {
    console.error('Error submitting program:', error);
    Sentry.captureException(error);
    
    if (error.message.includes('Validation failed')) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(500).json({ error: 'Failed to submit program' });
  }
}
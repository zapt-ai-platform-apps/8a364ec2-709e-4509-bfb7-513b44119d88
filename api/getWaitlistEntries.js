import { waitlistService } from './services/waitlist/index.js';
import { authenticateUser } from "./utils/auth.js";
import Sentry from "./utils/sentry.js";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await authenticateUser(req);
    console.log('Fetching waitlist entries for admin:', user.email);

    const result = await waitlistService.getEntries(user);
    console.log(`Retrieved ${result.entries.length} waitlist entries`);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error getting waitlist entries:', error);
    Sentry.captureException(error);
    
    if (error.message === 'Not authorized to access waitlist entries') {
      return res.status(403).json({ error: error.message });
    }
    
    return res.status(500).json({ error: error.message });
  }
}
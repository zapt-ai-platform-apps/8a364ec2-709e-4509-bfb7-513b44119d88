import { waitlistService } from './waitlist/service.js';
import Sentry from "./shared/sentry.js";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, feedback, desiredApps } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    console.log('Submitting waitlist entry:', { email, feedback: feedback?.substring(0, 50) });

    const result = await waitlistService.submitEntry({ email, feedback, desiredApps });
    console.log('Successfully added to waitlist:', email);

    return res.status(201).json(result);
  } catch (error) {
    console.error('Error submitting to waitlist:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
}
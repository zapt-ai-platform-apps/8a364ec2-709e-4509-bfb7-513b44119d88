import { customerSupportService } from './customerSupport/service.js';
import Sentry from "./shared/sentry.js";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  try {
    const { email } = req.body;
    const supportResponse = await customerSupportService.getChatCredentials(email);
    console.log('Customer support response:', supportResponse);
    return res.status(200).json(supportResponse);
  } catch (error) {
    console.error('Error in customerSupport endpoint:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
}
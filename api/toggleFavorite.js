import { favoritesService } from './services/favorites/index.js';
import { authenticateUser } from "./utils/auth.js";
import Sentry from "./utils/sentry.js";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await authenticateUser(req);
    const { appId } = req.body;

    if (!appId) {
      return res.status(400).json({ error: 'App ID is required' });
    }

    console.log(`Toggling favorite for user ${user.id} and app ${appId}`);

    const result = await favoritesService.toggleFavorite(user.id, appId);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error toggling favorite:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
}
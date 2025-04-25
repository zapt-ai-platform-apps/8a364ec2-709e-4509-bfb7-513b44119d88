import { favoritesService } from './services/favorites/index.js';
import { authenticateUser } from "./utils/auth.js";
import Sentry from "./utils/sentry.js";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await authenticateUser(req);
    console.log(`Getting favorites for user ${user.id}`);

    const result = await favoritesService.getUserFavorites(user.id);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error getting favorites:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
}
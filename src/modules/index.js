import { initialize as initializeAffiliatePrograms } from './affiliatePrograms/internal/services';
import { initialize as initializeCustomerSupport } from './customerSupport';

export async function initializeModules() {
  try {
    await Promise.all([
      initializeAffiliatePrograms(),
      initializeCustomerSupport(),
    ]);
    return { success: true };
  } catch (error) {
    console.error('Failed to initialize modules:', error);
    return { success: false, error };
  }
}
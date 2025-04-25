import { z } from 'zod';
import Sentry from './sentry.js';

/**
 * Creates a validator function for the given schema
 * Simplified version of the module validator for API use
 */
export const createValidator = (schema, contextName) => {
  return (data, options = {}) => {
    try {
      return schema.parse(data);
    } catch (error) {
      // Format validation errors
      const formattedErrors = error.errors?.map(err => 
        `${err.path.join('.')}: ${err.message}`
      ).join('\n') || error.message;
      
      // Create descriptive error message
      const errorMessage = `Validation failed for ${contextName}\nErrors:\n${formattedErrors}`;
      
      // Log to console
      console.error(errorMessage);
      
      // Send to Sentry
      Sentry.captureException(error, {
        extra: {
          type: contextName,
          receivedData: JSON.stringify(data),
          validationErrors: formattedErrors
        }
      });
      
      // Throw with improved message
      throw new Error(errorMessage);
    }
  };
};
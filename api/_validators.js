import { z } from 'zod';
import Sentry from './_sentry.js';

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

// Define schemas for affiliate programs
export const affiliateProgramSchema = z.object({
  id: z.number().optional(),
  userId: z.string(),
  appName: z.string().min(1, 'App name is required'),
  appDescription: z.string().min(1, 'App description is required'),
  appUrl: z.string().url('Valid URL is required'),
  commissionStructure: z.string().min(1, 'Commission structure is required'),
  paymentTerms: z.string().min(1, 'Payment terms are required'),
  affiliateSignupUrl: z.string().url('Valid affiliate signup URL is required'),
  promotionalMaterials: z.string().optional().nullable(),
  status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createProgramSchema = affiliateProgramSchema.omit({
  id: true, 
  createdAt: true,
  updatedAt: true,
});

export const updateProgramSchema = affiliateProgramSchema.partial().extend({
  id: z.number(),
});

export const updateProgramStatusSchema = z.object({
  programId: z.number(),
  status: z.enum(['approved', 'rejected']),
});

// Create validators
export const validateProgram = createValidator(affiliateProgramSchema, 'AffiliateProgram');
export const validateCreateProgram = createValidator(createProgramSchema, 'CreateAffiliateProgram');
export const validateUpdateProgram = createValidator(updateProgramSchema, 'UpdateAffiliateProgram');
export const validateUpdateProgramStatus = createValidator(updateProgramStatusSchema, 'UpdateProgramStatus');
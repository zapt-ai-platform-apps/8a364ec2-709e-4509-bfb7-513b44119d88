import { z } from 'zod';
import { createValidator } from '../shared/validators.js';

// Define schemas for affiliate apps
export const affiliateAppSchema = z.object({
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

export const createAppSchema = affiliateAppSchema.omit({
  id: true, 
  createdAt: true,
  updatedAt: true,
});

export const updateAppSchema = affiliateAppSchema.partial().extend({
  id: z.number(),
});

export const updateAppStatusSchema = z.object({
  appId: z.number(),
  status: z.enum(['approved', 'rejected']),
});

// Create validators
export const validateApp = createValidator(affiliateAppSchema, 'AffiliateApp');
export const validateCreateApp = createValidator(createAppSchema, 'CreateAffiliateApp');
export const validateUpdateApp = createValidator(updateAppSchema, 'UpdateAffiliateApp');
export const validateUpdateAppStatus = createValidator(updateAppStatusSchema, 'UpdateAppStatus');
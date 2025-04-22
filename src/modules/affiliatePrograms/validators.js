import { z } from 'zod';
import { createValidator } from '../core/validators';

// Define schema for an affiliate program
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

// Schema for creating a program (without id and timestamps)
export const createProgramSchema = affiliateProgramSchema.omit({
  id: true, 
  createdAt: true,
  updatedAt: true,
});

// Schema for updating a program
export const updateProgramSchema = affiliateProgramSchema.partial().extend({
  id: z.number(),
});

// Schema for program status update
export const updateProgramStatusSchema = z.object({
  programId: z.number(),
  status: z.enum(['approved', 'rejected']),
});

// Create validators
export const validateProgram = createValidator(affiliateProgramSchema, 'AffiliateProgram');
export const validateCreateProgram = createValidator(createProgramSchema, 'CreateAffiliateProgram');
export const validateUpdateProgram = createValidator(updateProgramSchema, 'UpdateAffiliateProgram');
export const validateUpdateProgramStatus = createValidator(updateProgramStatusSchema, 'UpdateProgramStatus');
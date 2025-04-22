import { z } from 'zod';
import { createValidator } from '@/modules/core/validators';

export const chatRequestSchema = z.object({
  email: z.string().email()
});

export const validateChatRequest = createValidator(chatRequestSchema, 'ChatRequest');
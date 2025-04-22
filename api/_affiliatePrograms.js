import { 
  validateProgram, 
  validateCreateProgram, 
  validateUpdateProgramStatus 
} from './_validators.js';
import { 
  getProgramsByStatus,
  getProgramsByUser,
  createProgram,
  updateProgramStatus
} from './_affiliateProgramsDb.js';
import { eventBus } from './_eventBus.js';
import { Resend } from 'resend';
import Sentry from './_sentry.js';

// Events
const events = {
  PROGRAM_SUBMITTED: 'affiliatePrograms/programSubmitted',
  PROGRAM_UPDATED: 'affiliatePrograms/programUpdated',
  PROGRAM_STATUS_CHANGED: 'affiliatePrograms/programStatusChanged',
};

/**
 * Send email notification about a new program submission
 */
const sendNewProgramEmail = async (program) => {
  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'ZAPT Affiliate Marketplace <notifications@resend.dev>',
        to: 'david@zapt.ai',
        subject: 'New Affiliate Program Submission',
        html: `
          <h1>New Affiliate Program Submission</h1>
          <p>A new affiliate program has been submitted:</p>
          <ul>
            <li><strong>App Name:</strong> ${program.appName}</li>
            <li><strong>App Description:</strong> ${program.appDescription}</li>
            <li><strong>App URL:</strong> ${program.appUrl}</li>
            <li><strong>Commission Structure:</strong> ${program.commissionStructure}</li>
            <li><strong>Payment Terms:</strong> ${program.paymentTerms}</li>
            <li><strong>Affiliate Signup URL:</strong> ${program.affiliateSignupUrl}</li>
          </ul>
          <p>Please review this submission in the admin portal.</p>
        `,
      });
      console.log('Email notification sent');
    } else {
      console.log('Skipping email notification: RESEND_API_KEY not configured');
    }
  } catch (error) {
    console.error('Error sending email notification:', error);
    Sentry.captureException(error);
    // Don't throw the error, just log it
  }
};

// Service functions
const getApprovedPrograms = async () => {
  return getProgramsByStatus('approved');
};

const getPendingPrograms = async () => {
  return getProgramsByStatus('pending');
};

const getUserPrograms = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }
  return getProgramsByUser(userId);
};

const submitProgram = async (userData, programData) => {
  // Validate the input data
  const validatedData = validateCreateProgram(programData);

  // Prepare the program data with user ID
  const dataWithUser = {
    ...validatedData,
    userId: userData.id,
    status: 'pending'
  };

  // Insert into database
  const result = await createProgram(dataWithUser);
  const createdProgram = result[0];

  // Publish event
  eventBus.publish(events.PROGRAM_SUBMITTED, {
    program: createdProgram,
    user: userData
  });

  // Send email notification
  await sendNewProgramEmail(createdProgram);

  return createdProgram;
};

const reviewProgram = async (userData, programId, status) => {
  // Validate the input data
  const validatedData = validateUpdateProgramStatus({
    programId: Number(programId),
    status
  });

  // Check admin privileges
  if (!userData.email?.endsWith('@zapt.ai') && !userData.email?.endsWith('@mapt.events')) {
    throw new Error('Not authorized to review programs');
  }

  // Update program status
  const result = await updateProgramStatus(validatedData.programId, validatedData.status);

  if (result.length === 0) {
    throw new Error('Program not found');
  }

  const updatedProgram = result[0];

  // Publish event
  eventBus.publish(events.PROGRAM_STATUS_CHANGED, {
    program: updatedProgram,
    previousStatus: 'pending',
    newStatus: validatedData.status,
    reviewedBy: userData.id
  });

  return updatedProgram;
};

// Public API
export const api = {
  /**
   * Get all approved programs for the marketplace
   */
  getApprovedPrograms: async () => {
    const programs = await getApprovedPrograms();
    return { programs };
  },

  /**
   * Get all pending programs for admin review
   */
  getPendingPrograms: async (user) => {
    if (!user) {
      throw new Error('User is required');
    }
    
    // Check admin privileges
    if (!user.email?.endsWith('@zapt.ai') && !user.email?.endsWith('@mapt.events')) {
      throw new Error('Not authorized to access pending programs');
    }
    
    const programs = await getPendingPrograms();
    return { programs };
  },

  /**
   * Get all programs submitted by a specific user
   */
  getUserPrograms: async (user) => {
    if (!user) {
      throw new Error('User is required');
    }
    
    const programs = await getUserPrograms(user.id);
    return { programs };
  },

  /**
   * Submit a new affiliate program
   */
  submitProgram: async (user, programData) => {
    if (!user) {
      throw new Error('User is required');
    }
    
    const program = await submitProgram(user, programData);
    return { 
      message: 'Program submitted successfully',
      program: validateProgram(program)
    };
  },

  /**
   * Review (approve or reject) a program
   */
  reviewProgram: async (user, programId, status) => {
    if (!user) {
      throw new Error('User is required');
    }
    
    const program = await reviewProgram(user, programId, status);
    return { 
      message: `Program ${status} successfully`,
      program: validateProgram(program)
    };
  }
};
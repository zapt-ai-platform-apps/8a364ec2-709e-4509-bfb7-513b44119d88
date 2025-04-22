import * as db from './database.js';
import { eventBus } from '../../core/events.js';
import { events } from '../events.js';
import { validateCreateProgram, validateUpdateProgramStatus } from '../validators.js';
import { Resend } from 'resend';

/**
 * Get all approved programs for the marketplace
 */
export const getApprovedPrograms = async () => {
  return db.getProgramsByStatus('approved');
};

/**
 * Get all pending programs awaiting review
 */
export const getPendingPrograms = async () => {
  return db.getProgramsByStatus('pending');
};

/**
 * Get all programs submitted by a specific user
 */
export const getUserPrograms = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }
  return db.getProgramsByUser(userId);
};

/**
 * Submit a new affiliate program
 */
export const submitProgram = async (userData, programData) => {
  // Validate the input data
  const validatedData = validateCreateProgram(programData, {
    actionName: 'submitProgram',
    location: 'affiliatePrograms/internal/services.js',
    direction: 'incoming',
    moduleFrom: 'api',
    moduleTo: 'affiliatePrograms'
  });

  // Prepare the program data with user ID
  const dataWithUser = {
    ...validatedData,
    userId: userData.id,
    status: 'pending'
  };

  // Insert into database
  const result = await db.createProgram(dataWithUser);
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

/**
 * Review (approve or reject) a program
 */
export const reviewProgram = async (userData, programId, status) => {
  // Validate the input data
  const validatedData = validateUpdateProgramStatus({
    programId: Number(programId),
    status
  }, {
    actionName: 'reviewProgram',
    location: 'affiliatePrograms/internal/services.js',
    direction: 'incoming',
    moduleFrom: 'api',
    moduleTo: 'affiliatePrograms'
  });

  // Check admin privileges
  if (!userData.email?.endsWith('@zapt.ai') && !userData.email?.endsWith('@mapt.events')) {
    throw new Error('Not authorized to review programs');
  }

  // Update program status
  const result = await db.updateProgramStatus(validatedData.programId, validatedData.status);

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
    // Don't throw the error, just log it
  }
};
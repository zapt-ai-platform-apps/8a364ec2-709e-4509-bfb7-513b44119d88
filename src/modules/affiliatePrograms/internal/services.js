import * as db from './database.js';
import { eventBus } from '../../core/events.js';
import { events } from '../events.js';
import { validateCreateApp, validateUpdateAppStatus } from '../validators.js';
import { Resend } from 'resend';

/**
 * Get all approved apps for the marketplace
 */
export const getApprovedApps = async () => {
  return db.getAppsByStatus('approved');
};

/**
 * Get all pending apps awaiting review
 */
export const getPendingApps = async () => {
  return db.getAppsByStatus('pending');
};

/**
 * Get all apps submitted by a specific user
 */
export const getUserApps = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }
  return db.getAppsByUser(userId);
};

/**
 * Submit a new affiliate app
 */
export const submitApp = async (userData, appData) => {
  // Validate the input data
  const validatedData = validateCreateApp(appData, {
    actionName: 'submitApp',
    location: 'affiliatePrograms/internal/services.js',
    direction: 'incoming',
    moduleFrom: 'api',
    moduleTo: 'affiliatePrograms'
  });

  // Prepare the app data with user ID
  const dataWithUser = {
    ...validatedData,
    userId: userData.id,
    status: 'pending'
  };

  // Insert into database
  const result = await db.createApp(dataWithUser);
  const createdApp = result[0];

  // Publish event
  eventBus.publish(events.APP_SUBMITTED, {
    app: createdApp,
    user: userData
  });

  // Send email notification
  await sendNewAppEmail(createdApp);

  return createdApp;
};

/**
 * Review (approve or reject) an app
 */
export const reviewApp = async (userData, appId, status) => {
  // Validate the input data
  const validatedData = validateUpdateAppStatus({
    appId: Number(appId),
    status
  }, {
    actionName: 'reviewApp',
    location: 'affiliatePrograms/internal/services.js',
    direction: 'incoming',
    moduleFrom: 'api',
    moduleTo: 'affiliatePrograms'
  });

  // Check admin privileges
  if (!userData.email?.endsWith('@zapt.ai') && !userData.email?.endsWith('@mapt.events')) {
    throw new Error('Not authorized to review apps');
  }

  // Update app status
  const result = await db.updateAppStatus(validatedData.appId, validatedData.status);

  if (result.length === 0) {
    throw new Error('App not found');
  }

  const updatedApp = result[0];

  // Publish event
  eventBus.publish(events.APP_STATUS_CHANGED, {
    app: updatedApp,
    previousStatus: 'pending',
    newStatus: validatedData.status,
    reviewedBy: userData.id
  });

  return updatedApp;
};

/**
 * Send email notification about a new app submission
 */
const sendNewAppEmail = async (app) => {
  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'ZAPT Affiliate Marketplace <notifications@resend.dev>',
        to: 'david@zapt.ai',
        subject: 'New Affiliate App Submission',
        html: `
          <h1>New Affiliate App Submission</h1>
          <p>A new affiliate app has been submitted:</p>
          <ul>
            <li><strong>App Name:</strong> ${app.appName}</li>
            <li><strong>App Description:</strong> ${app.appDescription}</li>
            <li><strong>App URL:</strong> ${app.appUrl}</li>
            <li><strong>Commission Structure:</strong> ${app.commissionStructure}</li>
            <li><strong>Payment Terms:</strong> ${app.paymentTerms}</li>
            <li><strong>Affiliate Signup URL:</strong> ${app.affiliateSignupUrl}</li>
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
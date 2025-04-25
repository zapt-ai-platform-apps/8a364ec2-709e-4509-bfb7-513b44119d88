import { 
  validateApp, 
  validateCreateApp, 
  validateUpdateAppStatus 
} from './validation.js';
import { 
  getAppsByStatus,
  getAppsByUser,
  createApp,
  updateAppStatus
} from './database.js';
import { eventBus } from '../shared/eventBus.js';
import { Resend } from 'resend';
import Sentry from '../shared/sentry.js';

// Events
export const events = {
  APP_SUBMITTED: 'affiliateApps/appSubmitted',
  APP_UPDATED: 'affiliateApps/appUpdated',
  APP_STATUS_CHANGED: 'affiliateApps/appStatusChanged',
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
    Sentry.captureException(error);
    // Don't throw the error, just log it
  }
};

// Service functions
const getApprovedApps = async () => {
  const apps = await getAppsByStatus('approved');
  return { apps };
};

const getPendingApps = async (user) => {
  if (!user) {
    throw new Error('User is required');
  }
  
  // Check admin privileges
  if (!user.email?.endsWith('@zapt.ai') && !user.email?.endsWith('@mapt.events')) {
    throw new Error('Not authorized to access pending apps');
  }
  
  const apps = await getAppsByStatus('pending');
  return { apps };
};

const getUserApps = async (user) => {
  if (!user) {
    throw new Error('User is required');
  }
  
  const apps = await getAppsByUser(user.id);
  return { apps };
};

const submitApp = async (userData, appData) => {
  // Make sure we have a clean object without an id field
  // Use destructuring to explicitly remove the id field if present
  const { id, ...cleanAppData } = appData;
  
  // First, prepare the data with user ID
  const dataWithUser = {
    ...cleanAppData,
    userId: userData.id,
    status: 'pending'
  };

  // Then validate the complete data with userId included
  const validatedData = validateCreateApp(dataWithUser);

  // Insert into database
  const result = await createApp(validatedData);
  const createdApp = result[0];

  // Publish event
  eventBus.publish(events.APP_SUBMITTED, {
    app: createdApp,
    user: userData
  });

  // Send email notification
  await sendNewAppEmail(createdApp);

  return { 
    message: 'App submitted successfully',
    app: validateApp(createdApp)
  };
};

const reviewApp = async (userData, appId, status) => {
  // Validate the input data
  const validatedData = validateUpdateAppStatus({
    appId: Number(appId),
    status
  });

  // Check admin privileges
  if (!userData.email?.endsWith('@zapt.ai') && !userData.email?.endsWith('@mapt.events')) {
    throw new Error('Not authorized to review apps');
  }

  // Update app status
  const result = await updateAppStatus(validatedData.appId, validatedData.status);

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

  return { 
    message: `App ${status} successfully`,
    app: validateApp(updatedApp)
  };
};

// Public API
export const affiliateAppsService = {
  getApprovedApps,
  getPendingApps,
  getUserApps,
  submitApp,
  reviewApp
};
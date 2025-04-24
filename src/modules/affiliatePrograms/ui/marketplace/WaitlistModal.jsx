import React, { useState } from 'react';
import { Modal } from '@/shared/components/ui';
import * as Sentry from "@sentry/browser";

export default function WaitlistModal({ isOpen, onClose, userEmail = '' }) {
  const [email, setEmail] = useState(userEmail);
  const [feedback, setFeedback] = useState('');
  const [desiredApps, setDesiredApps] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/submitWaitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          feedback,
          desiredApps
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }
      
      setSuccess(true);
    } catch (error) {
      console.error('Error joining waitlist:', error);
      Sentry.captureException(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail(userEmail);
    setFeedback('');
    setDesiredApps('');
    setSuccess(false);
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Join Affiliate Marketplace Waitlist">
      {success ? (
        <div className="text-center py-4">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-secondary-900 mb-2">Thank you for joining!</h3>
          <p className="text-secondary-600 mb-6">
            We've added you to our waitlist. We'll notify you when the ZAPT Affiliate Marketplace launches.
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6 text-secondary-600">
            <p>
              The ZAPT Affiliate Marketplace is coming soon! Join our waitlist to be notified when we launch and get early access.
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full p-3 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500 box-border"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            
            <div>
              <label htmlFor="desiredApps" className="block text-sm font-medium text-secondary-700 mb-1">
                What kind of apps would you like to promote or sell? (optional)
              </label>
              <textarea
                id="desiredApps"
                rows={3}
                className="w-full p-3 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500 box-border"
                placeholder="Describe the types of apps you'd be interested in..."
                value={desiredApps}
                onChange={(e) => setDesiredApps(e.target.value)}
                disabled={loading}
              />
            </div>
            
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-secondary-700 mb-1">
                Any additional feedback? (optional)
              </label>
              <textarea
                id="feedback"
                rows={3}
                className="w-full p-3 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500 box-border"
                placeholder="Share any other thoughts or questions..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          
          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="bg-white hover:bg-secondary-50 text-secondary-700 px-4 py-2 rounded-md text-sm font-medium border border-secondary-300 cursor-pointer"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer disabled:opacity-75"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Join Waitlist'
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
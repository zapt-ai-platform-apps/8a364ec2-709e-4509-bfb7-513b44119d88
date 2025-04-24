import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import * as Sentry from "@sentry/browser";
import Layout from '@/app/components/layout/Layout';
import { useAuth } from '@/shared/hooks/useAuth';
import { supabase } from '@/shared/services/supabase';

export default function AdminReview() {
  const { user, loading } = useAuth();
  const [apps, setApps] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [error, setError] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(null);
  const location = useLocation();

  // Check if the user has a zapt.ai or mapt.events email
  const isAdmin = user?.email && (user.email.endsWith('@zapt.ai') || user.email.endsWith('@mapt.events')) || false;

  useEffect(() => {
    const fetchPendingApps = async () => {
      if (!user || !isAdmin) return;
      
      try {
        setLoadingApps(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        const response = await fetch('/api/getPendingApps', {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch apps');
        }
        
        setApps(data.apps);
      } catch (error) {
        console.error('Error fetching pending apps:', error);
        Sentry.captureException(error);
        setError(error.message);
      } finally {
        setLoadingApps(false);
      }
    };
    
    fetchPendingApps();
  }, [user, isAdmin]);

  const handleReviewAction = async (appId, status) => {
    try {
      setActionInProgress(appId);
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('/api/reviewApp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ appId, status }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to review app');
      }
      
      // Update the apps list
      setApps(apps.filter(app => app.id !== appId));
      
    } catch (error) {
      console.error('Error reviewing app:', error);
      Sentry.captureException(error);
      setError(error.message);
    } finally {
      setActionInProgress(null);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  // If user is not logged in, redirect to login page with return_to parameter
  if (!loading && !user) {
    return <Navigate to={`/login?return_to=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // If user is logged in but not an admin, redirect to home
  if (!loading && user && !isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div className="bg-secondary-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-secondary-900">Admin Review</h1>
              <Link 
                to="/admin/waitlist" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm cursor-pointer"
              >
                View Waitlist
              </Link>
            </div>
            <p className="text-secondary-600 mb-8">Review pending affiliate app submissions for approval.</p>
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
                <div className="flex">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {loadingApps ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-600"></div>
              </div>
            ) : apps.length === 0 ? (
              <div className="bg-white rounded-xl shadow-soft p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-secondary-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-2xl font-semibold text-secondary-800 mb-4">No pending apps</h2>
                <p className="text-secondary-600">
                  There are no apps waiting for review at this time.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {apps.map((app) => (
                  <div key={app.id} className="bg-white rounded-xl shadow-soft overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold text-secondary-900 mb-3">{app.appName}</h2>
                      <div className="bg-secondary-50 p-4 rounded-lg mb-6">
                        <p className="text-secondary-700">{app.appDescription}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="font-medium text-secondary-800 mb-2">Commission Structure</h3>
                          <div className="bg-secondary-50 p-3 rounded-lg">
                            <p className="text-secondary-700">{app.commissionStructure}</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-secondary-800 mb-2">Payment Terms</h3>
                          <div className="bg-secondary-50 p-3 rounded-lg">
                            <p className="text-secondary-700">{app.paymentTerms}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mb-6">
                        <a 
                          href={app.appUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium cursor-pointer"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Visit App
                        </a>
                        <a 
                          href={app.affiliateSignupUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium cursor-pointer"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.172 13.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
                          </svg>
                          Affiliate Link
                        </a>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 border-t border-secondary-100 pt-6">
                        <button
                          onClick={() => handleReviewAction(app.id, 'approved')}
                          disabled={actionInProgress === app.id}
                          className={`bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-md shadow-sm font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                            actionInProgress === app.id ? 'opacity-75 cursor-not-allowed' : ''
                          }`}
                        >
                          {actionInProgress === app.id ? (
                            <>
                              <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Approve
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleReviewAction(app.id, 'rejected')}
                          disabled={actionInProgress === app.id}
                          className={`bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-md shadow-sm font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                            actionInProgress === app.id ? 'opacity-75 cursor-not-allowed' : ''
                          }`}
                        >
                          {actionInProgress === app.id ? (
                            <>
                              <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              Reject
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
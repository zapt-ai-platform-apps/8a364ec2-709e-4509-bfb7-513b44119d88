import React, { useState, useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import * as Sentry from "@sentry/browser";
import Layout from '@/app/components/layout/Layout';
import { useAuth } from '@/shared/hooks/useAuth';
import { supabase } from '@/shared/services/supabase';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [apps, setApps] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [notification, setNotification] = useState(location.state?.notification || null);

  useEffect(() => {
    const fetchApps = async () => {
      if (!user) return;
      
      try {
        setLoadingApps(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        const response = await fetch('/api/getMyApps', {
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
        console.error('Error fetching apps:', error);
        Sentry.captureException(error);
        setError(error.message);
      } finally {
        setLoadingApps(false);
      }
    };
    
    fetchApps();
    
    // Clear notification after 5 seconds
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [user, notification]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="bg-secondary-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {notification && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{notification}</span>
                </div>
              </div>
            )}
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-secondary-900 mb-2">Your Affiliate Apps</h1>
                <p className="text-secondary-600">Manage and track your submitted affiliate apps</p>
              </div>
              <Link 
                to="/submit-app"
                className="mt-4 md:mt-0 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-md shadow-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Submit New App
              </Link>
            </div>
            
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h2 className="text-2xl font-semibold text-secondary-800 mb-4">No apps submitted yet</h2>
                <p className="text-secondary-600 mb-6">
                  Submit your first affiliate app to get started. Once reviewed and approved, your app will appear in our marketplace.
                </p>
                <Link 
                  to="/submit-app"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md shadow-sm font-medium transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Submit an App
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {apps.map((app) => (
                  <div key={app.id} className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-secondary-900 mb-2 md:mb-0">{app.appName}</h2>
                            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                              app.status === 'approved' ? 'bg-green-100 text-green-800' :
                              app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                          </div>
                          
                          <p className="text-secondary-600 mb-6">{app.appDescription.substring(0, 200)}...</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                              <h3 className="font-medium text-secondary-800 mb-1">Commission Structure</h3>
                              <p className="text-secondary-600">{app.commissionStructure}</p>
                            </div>
                            <div>
                              <h3 className="font-medium text-secondary-800 mb-1">Payment Terms</h3>
                              <p className="text-secondary-600">{app.paymentTerms}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-4">
                            <a 
                              href={app.appUrl} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-700 font-medium flex items-center transition-colors cursor-pointer"
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
                              className="text-primary-600 hover:text-primary-700 font-medium flex items-center transition-colors cursor-pointer"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                              Affiliate Link
                            </a>
                          </div>
                        </div>
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
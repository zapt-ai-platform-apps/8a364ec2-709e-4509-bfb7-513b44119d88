import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import * as Sentry from "@sentry/browser";
import Layout from '@/app/components/layout/Layout';
import { useAuth } from '@/shared/hooks/useAuth';
import { supabase } from '@/shared/services/supabase';
import { formatDate } from '@/shared/utils/dateUtils';
import { LoadingSpinner } from '@/shared/components/ui';

export default function WaitlistEntries() {
  const { user, loading } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Check if the user has a zapt.ai or mapt.events email
  const isAdmin = user?.email && (user.email.endsWith('@zapt.ai') || user.email.endsWith('@mapt.events')) || false;

  useEffect(() => {
    const fetchWaitlistEntries = async () => {
      if (!user || !isAdmin) return;
      
      try {
        setLoadingEntries(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        const response = await fetch('/api/getWaitlistEntries', {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch waitlist entries');
        }
        
        setEntries(data.entries);
        console.log('Retrieved waitlist entries:', data.entries.length);
      } catch (error) {
        console.error('Error fetching waitlist entries:', error);
        Sentry.captureException(error);
        setError(error.message);
      } finally {
        setLoadingEntries(false);
      }
    };
    
    fetchWaitlistEntries();
  }, [user, isAdmin]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
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
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">Waitlist Entries</h1>
            <p className="text-secondary-600 mb-8">View all users who have joined the waitlist.</p>
            
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
            {loadingEntries ? (
              <div className="flex justify-center items-center py-16">
                <LoadingSpinner />
              </div>
            ) : entries.length === 0 ? (
              <div className="bg-white rounded-xl shadow-soft p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-secondary-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-2xl font-semibold text-secondary-800 mb-4">No waitlist entries yet</h2>
                <p className="text-secondary-600">
                  There are no users on the waitlist yet.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto bg-white rounded-xl shadow-soft">
                <table className="min-w-full divide-y divide-secondary-200">
                  <thead className="bg-secondary-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Desired Apps
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Feedback
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-secondary-200">
                    {entries.map((entry) => (
                      <tr key={entry.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                          {entry.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-secondary-600 max-w-xs overflow-hidden">
                          {entry.desiredApps || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-secondary-600 max-w-xs overflow-hidden">
                          {entry.feedback || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                          {formatDate(entry.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
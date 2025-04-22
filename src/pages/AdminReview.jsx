import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import * as Sentry from "@sentry/browser";
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/supabaseClient';

export default function AdminReview() {
  const { user, loading } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [error, setError] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(null);

  // Check if the user has a zapt.ai email
  const isAdmin = user?.email?.endsWith('@zapt.ai') || false;

  useEffect(() => {
    const fetchPendingPrograms = async () => {
      if (!user || !isAdmin) return;
      
      try {
        setLoadingPrograms(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        const response = await fetch('/api/getPendingPrograms', {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch programs');
        }
        
        setPrograms(data.programs);
      } catch (error) {
        console.error('Error fetching pending programs:', error);
        Sentry.captureException(error);
        setError(error.message);
      } finally {
        setLoadingPrograms(false);
      }
    };
    
    fetchPendingPrograms();
  }, [user, isAdmin]);

  const handleReviewAction = async (programId, status) => {
    try {
      setActionInProgress(programId);
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('/api/reviewProgram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ programId, status }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to review program');
      }
      
      // Update the programs list
      setPrograms(programs.filter(program => program.id !== programId));
      
    } catch (error) {
      console.error('Error reviewing program:', error);
      Sentry.captureException(error);
      setError(error.message);
    } finally {
      setActionInProgress(null);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (!loading && (!user || !isAdmin)) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Review</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {loadingPrograms ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : programs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No pending programs</h2>
            <p className="text-gray-600">
              There are no programs waiting for review at this time.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {programs.map((program) => (
              <div key={program.id} className="bg-white rounded-lg shadow-md p-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{program.appName}</h2>
                  <p className="text-gray-600 mb-6">{program.appDescription}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="font-medium text-gray-800 mb-1">Commission Structure</h3>
                      <p className="text-gray-600">{program.commissionStructure}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-1">Payment Terms</h3>
                      <p className="text-gray-600">{program.paymentTerms}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <a 
                      href={program.appUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Visit App
                    </a>
                    <a 
                      href={program.affiliateSignupUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Affiliate Link
                    </a>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => handleReviewAction(program.id, 'approved')}
                      disabled={actionInProgress === program.id}
                      className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer ${
                        actionInProgress === program.id ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {actionInProgress === program.id ? 'Processing...' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleReviewAction(program.id, 'rejected')}
                      disabled={actionInProgress === program.id}
                      className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer ${
                        actionInProgress === program.id ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {actionInProgress === program.id ? 'Processing...' : 'Reject'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
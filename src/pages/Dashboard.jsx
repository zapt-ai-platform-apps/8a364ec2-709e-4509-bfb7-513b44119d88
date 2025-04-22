import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import * as Sentry from "@sentry/browser";
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/supabaseClient';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      if (!user) return;
      
      try {
        setLoadingPrograms(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        const response = await fetch('/api/getMyPrograms', {
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
        console.error('Error fetching programs:', error);
        Sentry.captureException(error);
        setError(error.message);
      } finally {
        setLoadingPrograms(false);
      }
    };
    
    fetchPrograms();
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Your Affiliate Programs</h1>
          <Link 
            to="/submit-program"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
          >
            Submit New Program
          </Link>
        </div>
        
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No programs submitted yet</h2>
            <p className="text-gray-600 mb-6">
              Submit your first affiliate program to get started. Once reviewed and approved, your program will appear in our marketplace.
            </p>
            <Link 
              to="/submit-program"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-sm font-medium cursor-pointer"
            >
              Submit a Program
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {programs.map((program) => (
              <div key={program.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{program.appName}</h2>
                    <p className="text-gray-600 mb-4">{program.appDescription.substring(0, 150)}...</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="font-medium text-gray-800">Commission Structure</h3>
                        <p className="text-gray-600">{program.commissionStructure}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">Payment Terms</h3>
                        <p className="text-gray-600">{program.paymentTerms}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <a 
                        href={program.appUrl} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit App
                      </a>
                      <span className="text-gray-400">•</span>
                      <a 
                        href={program.affiliateSignupUrl} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Affiliate Link
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 mt-4 md:mt-0">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      program.status === 'approved' ? 'bg-green-100 text-green-800' :
                      program.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                    </span>
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
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import * as Sentry from "@sentry/browser";
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/supabaseClient';

export default function SubmitProgram() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    appName: '',
    appDescription: '',
    appUrl: '',
    commissionStructure: '',
    paymentTerms: '',
    affiliateSignupUrl: '',
    promotionalMaterials: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError(null);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('/api/submitProgram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit program');
      }
      
      navigate('/dashboard', { 
        state: { notification: 'Program submitted successfully! It will be reviewed soon.' } 
      });
      
    } catch (error) {
      console.error('Error submitting program:', error);
      Sentry.captureException(error);
      setError(error.message);
    } finally {
      setSubmitting(false);
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

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Submit Affiliate Program</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="appName" className="block text-sm font-medium text-gray-700 mb-1">
                  App Name *
                </label>
                <input
                  type="text"
                  id="appName"
                  name="appName"
                  value={formData.appName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 box-border"
                  placeholder="Your app's name"
                />
              </div>
              
              <div>
                <label htmlFor="appDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  App Description *
                </label>
                <textarea
                  id="appDescription"
                  name="appDescription"
                  value={formData.appDescription}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 box-border"
                  placeholder="Describe your app and what it does"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="appUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  App URL *
                </label>
                <input
                  type="url"
                  id="appUrl"
                  name="appUrl"
                  value={formData.appUrl}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 box-border"
                  placeholder="https://yourapp.com"
                />
              </div>
              
              <div>
                <label htmlFor="commissionStructure" className="block text-sm font-medium text-gray-700 mb-1">
                  Commission Structure *
                </label>
                <textarea
                  id="commissionStructure"
                  name="commissionStructure"
                  value={formData.commissionStructure}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 box-border"
                  placeholder="Describe your commission structure (e.g., 30% lifetime commission, 50% first month)"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Terms *
                </label>
                <textarea
                  id="paymentTerms"
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 box-border"
                  placeholder="Describe your payment terms (e.g., monthly payouts, minimum payout threshold)"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="affiliateSignupUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Affiliate Signup URL *
                </label>
                <input
                  type="url"
                  id="affiliateSignupUrl"
                  name="affiliateSignupUrl"
                  value={formData.affiliateSignupUrl}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 box-border"
                  placeholder="https://yourapp.com/affiliate"
                />
              </div>
              
              <div>
                <label htmlFor="promotionalMaterials" className="block text-sm font-medium text-gray-700 mb-1">
                  Promotional Materials (Optional)
                </label>
                <textarea
                  id="promotionalMaterials"
                  name="promotionalMaterials"
                  value={formData.promotionalMaterials}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 box-border"
                  placeholder="Provide links to any promotional materials (images, videos, etc.)"
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-sm font-medium cursor-pointer ${
                    submitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {submitting ? 'Submitting...' : 'Submit Program'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
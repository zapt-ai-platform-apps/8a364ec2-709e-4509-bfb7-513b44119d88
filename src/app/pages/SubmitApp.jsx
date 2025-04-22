import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import * as Sentry from "@sentry/browser";
import Layout from '@/app/components/layout/Layout';
import { useAuth } from '@/shared/hooks/useAuth';
import { supabase } from '@/shared/services/supabase';

export default function SubmitApp() {
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
      
      const response = await fetch('/api/submitApp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit app');
      }
      
      navigate('/dashboard', { 
        state: { notification: 'App submitted successfully! It will be reviewed soon.' } 
      });
      
    } catch (error) {
      console.error('Error submitting app:', error);
      Sentry.captureException(error);
      setError(error.message);
    } finally {
      setSubmitting(false);
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

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <Layout>
      <div className="bg-secondary-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">Submit Affiliate App</h1>
            <p className="text-secondary-600 mb-8">Complete the form below to have your affiliate app reviewed for our marketplace.</p>
          </div>
        </div>
      </div>
      
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
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
            
            <div className="bg-white rounded-xl shadow-soft p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="appName" className="block text-sm font-medium text-secondary-700 mb-1">
                      App Name *
                    </label>
                    <input
                      type="text"
                      id="appName"
                      name="appName"
                      value={formData.appName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all box-border"
                      placeholder="Your app's name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="appDescription" className="block text-sm font-medium text-secondary-700 mb-1">
                      App Description *
                    </label>
                    <textarea
                      id="appDescription"
                      name="appDescription"
                      value={formData.appDescription}
                      onChange={handleChange}
                      rows="4"
                      required
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all box-border"
                      placeholder="Describe your app and what it does"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="appUrl" className="block text-sm font-medium text-secondary-700 mb-1">
                      App URL *
                    </label>
                    <input
                      type="url"
                      id="appUrl"
                      name="appUrl"
                      value={formData.appUrl}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all box-border"
                      placeholder="https://yourapp.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="commissionStructure" className="block text-sm font-medium text-secondary-700 mb-1">
                      Commission Structure *
                    </label>
                    <textarea
                      id="commissionStructure"
                      name="commissionStructure"
                      value={formData.commissionStructure}
                      onChange={handleChange}
                      rows="3"
                      required
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all box-border"
                      placeholder="Describe your commission structure (e.g., 30% lifetime commission, 50% first month)"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="paymentTerms" className="block text-sm font-medium text-secondary-700 mb-1">
                      Payment Terms *
                    </label>
                    <textarea
                      id="paymentTerms"
                      name="paymentTerms"
                      value={formData.paymentTerms}
                      onChange={handleChange}
                      rows="3"
                      required
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all box-border"
                      placeholder="Describe your payment terms (e.g., monthly payouts, minimum payout threshold)"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="affiliateSignupUrl" className="block text-sm font-medium text-secondary-700 mb-1">
                      Affiliate Signup URL *
                    </label>
                    <input
                      type="url"
                      id="affiliateSignupUrl"
                      name="affiliateSignupUrl"
                      value={formData.affiliateSignupUrl}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all box-border"
                      placeholder="https://yourapp.com/affiliate"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="promotionalMaterials" className="block text-sm font-medium text-secondary-700 mb-1">
                      Promotional Materials (Optional)
                    </label>
                    <textarea
                      id="promotionalMaterials"
                      name="promotionalMaterials"
                      value={formData.promotionalMaterials}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all box-border"
                      placeholder="Provide links to any promotional materials (images, videos, etc.)"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md shadow-sm font-medium transition-colors cursor-pointer ${
                        submitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {submitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : 'Submit App'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
import React, { useState, useEffect } from 'react';
import * as Sentry from "@sentry/browser";
import Layout from '@/components/layout/Layout';

export default function Marketplace() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/api/getPrograms');
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
        setLoading(false);
      }
    };
    
    fetchPrograms();
  }, []);
  
  const filteredPrograms = programs.filter(program => 
    program.appName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.appDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.commissionStructure.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Layout>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-secondary-100 to-secondary-200 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Affiliate Marketplace
            </h1>
            <p className="text-xl text-secondary-700">
              Browse our curated collection of quality affiliate programs with favorable commission structures.
            </p>
            
            {!loading && programs.length > 0 && (
              <div className="mt-8 max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search programs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-4 pl-12 border border-secondary-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all box-border"
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Programs listing */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 max-w-3xl mx-auto">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
            </div>
          ) : programs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-soft p-8 text-center max-w-2xl mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-secondary-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h2 className="text-2xl font-semibold text-secondary-800 mb-4">No programs available yet</h2>
              <p className="text-secondary-600">
                Check back soon! We're currently reviewing new programs to add to our marketplace.
              </p>
            </div>
          ) : filteredPrograms.length === 0 ? (
            <div className="bg-white rounded-xl shadow-soft p-8 text-center max-w-2xl mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-secondary-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-semibold text-secondary-800 mb-4">No matching programs found</h2>
              <p className="text-secondary-600 mb-6">
                Try adjusting your search terms or browse all programs by clearing the search.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="px-6 py-3 bg-primary-600 text-white rounded-md cursor-pointer hover:bg-primary-700 transition-colors font-medium"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program) => (
                <div key={program.id} className="bg-white rounded-xl shadow-soft overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                  <div className="p-6 flex-grow border-b border-secondary-100">
                    <h2 className="text-xl font-semibold text-secondary-900 mb-2">{program.appName}</h2>
                    <p className="text-secondary-600 mb-4 line-clamp-3">{program.appDescription}</p>
                    
                    <div className="mb-4">
                      <h3 className="font-medium text-secondary-800 mb-1">Commission Structure</h3>
                      <p className="text-secondary-600 text-sm line-clamp-2">{program.commissionStructure}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-secondary-800 mb-1">Payment Terms</h3>
                      <p className="text-secondary-600 text-sm line-clamp-2">{program.paymentTerms}</p>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-secondary-50 mt-auto">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a 
                        href={program.appUrl} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white hover:bg-secondary-100 text-secondary-800 px-4 py-2 rounded-md text-sm text-center border border-secondary-200 transition-colors cursor-pointer"
                      >
                        Visit App
                      </a>
                      <a 
                        href={program.affiliateSignupUrl} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm text-center transition-colors cursor-pointer"
                      >
                        Become an Affiliate
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
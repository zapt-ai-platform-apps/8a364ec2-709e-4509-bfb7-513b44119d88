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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Affiliate Marketplace</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our curated collection of quality affiliate programs with favorable commission structures.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {!loading && programs.length > 0 && (
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 box-border"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : programs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No programs available yet</h2>
            <p className="text-gray-600">
              Check back soon! We're currently reviewing new programs to add to our marketplace.
            </p>
          </div>
        ) : filteredPrograms.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No matching programs found</h2>
            <p className="text-gray-600">
              Try adjusting your search terms or browse all programs by clearing the search.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div className="p-6 flex-grow">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{program.appName}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{program.appDescription}</p>
                  
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-800 mb-1">Commission Structure</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{program.commissionStructure}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-1">Payment Terms</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{program.paymentTerms}</p>
                  </div>
                </div>
                
                <div className="px-6 pb-6 mt-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a 
                      href={program.appUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded text-sm text-center cursor-pointer"
                    >
                      Visit App
                    </a>
                    <a 
                      href={program.affiliateSignupUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm text-center cursor-pointer"
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
    </Layout>
  );
}
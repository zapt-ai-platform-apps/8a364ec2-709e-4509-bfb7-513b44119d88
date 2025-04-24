import React, { useState } from 'react';
import WaitlistModal from './WaitlistModal';
import { useAuth } from '@/shared/hooks/useAuth';

export default function MarketplaceHero({ searchTerm, onSearch, appCount }) {
  const { user } = useAuth();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchTerm);
  };

  return (
    <section className="bg-gradient-to-r from-secondary-100 to-secondary-200 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Waitlist Button */}
          <div className="mb-6">
            <button
              onClick={() => setIsWaitlistModalOpen(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-md shadow-sm font-medium transition-all cursor-pointer text-sm"
            >
              Join Waitlist
            </button>
          </div>
          
          <div className="inline-block bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md px-4 py-2 mb-6">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="font-medium">Coming Soon</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Affiliate Marketplace
          </h1>
          <p className="text-xl text-secondary-700 mb-4">
            Browse our curated collection of quality affiliate apps with favorable commission structures.
          </p>
          
          <div className="flex justify-center mb-6">
            <div className="bg-primary-100 text-primary-800 text-sm font-semibold px-4 py-2 rounded-full inline-block">
              {appCount} Vetted Opportunities Available
            </div>
          </div>

          {appCount > 0 && (
            <div className="mt-8 max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search apps..."
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                  className="w-full p-4 pl-12 border border-secondary-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all box-border"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button 
                  type="submit"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-primary-600 hover:text-primary-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      
      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={isWaitlistModalOpen} 
        onClose={() => setIsWaitlistModalOpen(false)}
        userEmail={user?.email || ''}
      />
    </section>
  );
}
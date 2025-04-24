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
        <div className="max-w-4xl mx-auto text-center">
          {/* Waitlist Button */}
          <div className="mb-6">
            <button
              onClick={() => setIsWaitlistModalOpen(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-md shadow-sm font-medium transition-all cursor-pointer text-sm"
            >
              Join Waitlist
            </button>
          </div>
          
          {/* Upgraded Coming Soon Badge */}
          <div className="inline-block relative group mb-6 overflow-hidden rounded-lg">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-90 animate-gradient-x"></div>
            
            {/* Subtle shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            
            {/* Badge content */}
            <div className="relative flex items-center gap-2 px-6 py-3 font-bold text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
              <span className="tracking-wide uppercase text-sm">Coming Soon</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-secondary-900 mb-4">
            Discover Quality Affiliate Programs
          </h1>
          <p className="text-xl text-secondary-700 mb-4">
            Find verified apps offering lifetime commissions and real value for your audience.
          </p>
          
          <div className="flex justify-center mb-6">
            <div className="bg-primary-100 text-primary-800 text-sm font-semibold px-4 py-2 rounded-full inline-block">
              {appCount} Vetted Opportunities Available
            </div>
          </div>

          {appCount > 0 && (
            <div className="mt-8 max-w-xl mx-auto">
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
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}
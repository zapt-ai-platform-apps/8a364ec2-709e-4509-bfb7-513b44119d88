import React, { useState } from 'react';

export default function MarketplaceHero({ searchTerm, onSearch, programCount }) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchTerm);
  };

  return (
    <section className="bg-gradient-to-r from-secondary-100 to-secondary-200 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Affiliate Marketplace
          </h1>
          <p className="text-xl text-secondary-700 mb-4">
            Browse our curated collection of quality affiliate programs with favorable commission structures.
          </p>
          
          <div className="flex justify-center mb-6">
            <div className="bg-primary-100 text-primary-800 text-sm font-semibold px-4 py-2 rounded-full inline-block">
              {programCount} Vetted Opportunities Available
            </div>
          </div>

          {programCount > 0 && (
            <div className="mt-8 max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search programs..."
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
    </section>
  );
}
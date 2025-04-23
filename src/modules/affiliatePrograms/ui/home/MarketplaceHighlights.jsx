import React from 'react';

export default function MarketplaceHighlights() {
  const comparisonData = [
    {
      traditional: "One-time commissions",
      ourMarketplace: "Lifetime recurring revenue",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      accent: "minimum 30% commission"
    },
    {
      traditional: "Uncertain payment schedules",
      ourMarketplace: "Reliable, transparent payments",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      accent: "guaranteed monthly payments"
    },
    {
      traditional: "Many low-quality or scam products",
      ourMarketplace: "Strictly vetted quality apps",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      accent: "we test each app personally"
    },
    {
      traditional: "Minimal support",
      ourMarketplace: "Dedicated affiliate success team",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      accent: "we help you succeed"
    }
  ];

  return (
    <div className="animate-on-scroll delay-100">
      <div className="relative px-4 py-8">
        {/* Visual connecting lines in background */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/20 to-accent-500/20 hidden lg:block"></div>
        
        <h3 className="text-2xl font-bold text-center mb-12 text-gray-800">Direct Comparison</h3>
        
        <div className="space-y-12">
          {comparisonData.map((item, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col lg:flex-row items-stretch">
                {/* Traditional side */}
                <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none transform transition-all hover:scale-[1.02] hover:shadow-xl">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold">Traditional Affiliates</h4>
                  </div>
                  <p className="text-gray-300 ml-11 text-lg">{item.traditional}</p>
                </div>
                
                {/* VS element */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-xl">
                  <span className="text-sm font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">VS</span>
                </div>
                
                {/* Our marketplace side */}
                <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-primary-600 to-accent-600 text-white rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none transform transition-all hover:scale-[1.02] hover:shadow-xl">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold">Our Marketplace</h4>
                  </div>
                  
                  <div className="flex items-start ml-11">
                    <div className="flex-1">
                      <p className="text-white text-lg font-medium">{item.ourMarketplace}</p>
                      <div className="mt-1.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                          {item.icon}
                          <span className="ml-1">{item.accent}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Connecting arrows on mobile */}
              {index < comparisonData.length - 1 && (
                <div className="flex justify-center my-4 lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}
              
              {/* Circle marker for large screens */}
              {index < comparisonData.length - 1 && (
                <div className="absolute left-1/2 bottom-0 transform translate-y-6 -translate-x-1/2 z-10 hidden lg:block">
                  <div className="w-3 h-3 rounded-full bg-accent-500"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-20">
        <div className="inline-block bg-white rounded-xl p-8 shadow-soft relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-accent-50 opacity-50"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready for a Better Affiliate Experience?</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Our marketplace is designed with your success in mind. Join today and discover the difference that transparent, recurring commissions can make for your income stability.
            </p>
            <a href="/marketplace" className="inline-block bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              Explore the Marketplace
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
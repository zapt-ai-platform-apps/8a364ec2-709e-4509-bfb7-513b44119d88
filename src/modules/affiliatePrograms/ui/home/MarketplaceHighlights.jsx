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
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-on-scroll">
        <div className="p-6 md:p-10">
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-800">Direct Comparison</h3>
          
          <div className="space-y-8 md:space-y-12">
            {comparisonData.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                {/* VS badge for desktop */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full bg-white shadow-xl">
                  <span className="text-sm font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">VS</span>
                </div>
                
                {/* Traditional side */}
                <div className="bg-gray-800 text-white p-6 rounded-2xl transform transition-all hover:scale-[1.02] hover:shadow-xl">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold">Traditional Affiliates</h4>
                  </div>
                  <p className="text-gray-300 ml-11 text-lg">{item.traditional}</p>
                </div>
                
                {/* VS badge for mobile */}
                <div className="flex md:hidden mx-auto items-center justify-center w-10 h-10 rounded-full bg-white shadow-xl">
                  <span className="text-sm font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">VS</span>
                </div>
                
                {/* Our marketplace side */}
                <div className="bg-gradient-to-br from-primary-600 to-accent-600 text-white p-6 rounded-2xl transform transition-all hover:scale-[1.02] hover:shadow-xl">
                  <div className="flex items-center mb-3">
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
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                          {item.icon}
                          <span className="ml-1">{item.accent}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center mt-12 animate-on-scroll delay-200">
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready for a Better Affiliate Experience?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our marketplace is designed with your success in mind. Join today and discover the difference that transparent, recurring commissions can make for your income stability.
          </p>
          <Link to="/marketplace" className="inline-block bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            Explore the Marketplace
          </Link>
        </div>
      </div>
    </div>
  );
}
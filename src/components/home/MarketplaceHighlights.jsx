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
      traditional: "Generic promotion materials",
      ourMarketplace: "Customizable, effective resources",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      accent: "proven conversion materials"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-6 text-center">Traditional Affiliate Programs</h3>
          <div className="relative">
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
              <div className="bg-accent-500 rounded-full p-2 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
            <div className="space-y-5">
              {comparisonData.map((item, index) => (
                <div key={`trad-${index}`} className="bg-gray-700/50 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-gray-300">{item.traditional}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-6 text-center">Our Marketplace</h3>
          <div className="space-y-5">
            {comparisonData.map((item, index) => (
              <div key={`our-${index}`} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm relative overflow-hidden group transition-all duration-300 hover:bg-white/20">
                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity">
                  {item.icon}
                </div>
                <div className="flex items-start">
                  <div className="mr-3 mt-1">{item.icon}</div>
                  <div>
                    <p className="font-semibold">{item.ourMarketplace}</p>
                    <p className="text-white/80 text-sm mt-1">
                      <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-medium">
                        {item.accent}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden flex justify-center mt-6">
        <div className="bg-accent-500 rounded-full p-3 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <div className="text-center mt-12">
        <div className="inline-block bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Ready for a Better Affiliate Experience?</h3>
          <p className="text-gray-600 mb-4">Our marketplace is designed with your success in mind. Join today and discover the difference.</p>
          <a href="/marketplace" className="inline-block bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
            Explore the Marketplace
          </a>
        </div>
      </div>
    </div>
  );
}
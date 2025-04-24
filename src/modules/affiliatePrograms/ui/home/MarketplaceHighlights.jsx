import React from 'react';
import { Link } from 'react-router-dom';

export default function MarketplaceHighlights() {
  const comparisonData = [
    {
      number: "1",
      category: "Commission Structure",
      others: "App Stores",
      othersDescription: "Low commission rates",
      us: "High-paying 30% commission structure"
    },
    {
      number: "2",
      category: "Program Access",
      others: "SaaS Affiliate Programs",
      othersDescription: "Strict approval processes",
      us: "Open participation model"
    },
    {
      number: "3",
      category: "Revenue Duration",
      others: "Traditional Programs",
      othersDescription: "One-time or short-term commissions",
      us: "Lifetime commission on all user purchases"
    },
    {
      number: "4",
      category: "Product Ecosystem",
      others: "Competitors",
      othersDescription: "Limited product selection or mixed categories",
      us: "Diverse collection of quality Progressive Web Apps on a unified platform"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-on-scroll">
        <div className="p-6 md:p-10">
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-800">OTHERS vs US Comparison</h3>
          
          <div className="space-y-12">
            {comparisonData.map((item, index) => (
              <div key={index} className="space-y-4">
                <h4 className="text-xl font-bold text-gray-800 mb-4">
                  {item.number}. {item.category}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  {/* VS badge for desktop */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full bg-white shadow-xl">
                    <span className="text-sm font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">VS</span>
                  </div>
                  
                  {/* Others side */}
                  <div className="bg-gray-800 text-white p-6 rounded-2xl transform transition-all hover:scale-[1.02] hover:shadow-xl">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h5 className="text-lg font-bold">{item.others}</h5>
                    </div>
                    <p className="text-gray-300 ml-11 text-lg">{item.othersDescription}</p>
                  </div>
                  
                  {/* VS badge for mobile */}
                  <div className="flex md:hidden mx-auto items-center justify-center w-10 h-10 rounded-full bg-white shadow-xl">
                    <span className="text-sm font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">VS</span>
                  </div>
                  
                  {/* Our side */}
                  <div className="bg-gradient-to-br from-primary-600 to-accent-600 text-white p-6 rounded-2xl transform transition-all hover:scale-[1.02] hover:shadow-xl">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h5 className="text-lg font-bold">Our Marketplace</h5>
                    </div>
                    <p className="text-white ml-11 text-lg font-bold">{item.us}</p>
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
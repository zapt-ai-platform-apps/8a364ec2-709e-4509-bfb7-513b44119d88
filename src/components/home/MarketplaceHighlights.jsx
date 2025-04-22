import React from 'react';
import { Link } from 'react-router-dom';

export default function MarketplaceHighlights() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="bg-primary-100 text-primary-800 text-sm font-semibold px-4 py-2 rounded-full inline-block mb-4">
              For Content Creators
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-accent-600">
              Why Choose Our Marketplace?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We focus on quality affiliate programs that offer sustainable income potential rather than one-time commissions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white rounded-xl shadow-md p-8 transform transition-all duration-300 hover:-translate-y-2 animate-on-scroll">
              <div className="w-16 h-16 bg-primary-100 rounded-lg mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Vetted Quality
              </h3>
              <p className="text-gray-600 mb-6">
                Every program in our marketplace has been carefully reviewed to ensure it offers real value to your audience and fair compensation to you.
              </p>
              <div className="border-t border-gray-100 pt-4">
                <Link to="/marketplace" className="text-primary-600 hover:text-primary-800 font-medium flex items-center">
                  <span>Explore vetted programs</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 transform transition-all duration-300 hover:-translate-y-2 animate-on-scroll delay-150">
              <div className="w-16 h-16 bg-accent-100 rounded-lg mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Recurring Revenue
              </h3>
              <p className="text-gray-600 mb-6">
                We prioritize programs with recurring commission models, helping you build a stable, predictable income stream rather than one-time payments.
              </p>
              <div className="border-t border-gray-100 pt-4">
                <Link to="/marketplace" className="text-accent-600 hover:text-accent-800 font-medium flex items-center">
                  <span>Find recurring programs</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 transform transition-all duration-300 hover:-translate-y-2 animate-on-scroll delay-300">
              <div className="w-16 h-16 bg-purple-100 rounded-lg mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                No Barriers
              </h3>
              <p className="text-gray-600 mb-6">
                Browse our marketplace without registration. We focus on making it easy for you to find and join legitimate programs without unnecessary obstacles.
              </p>
              <div className="border-t border-gray-100 pt-4">
                <Link to="/marketplace" className="text-purple-600 hover:text-purple-800 font-medium flex items-center">
                  <span>Start browsing now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16 animate-on-scroll delay-200">
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Many content creators already invest significant time in creating videos, posts, and building audiences. 
              Our marketplace helps you monetize these efforts with trustworthy affiliate partnerships.
            </p>
            <Link to="/marketplace" className="inline-block bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              Explore the Marketplace
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary-600 flex items-center gap-2">
          <img src="https://images.unsplash.com/photo-1496203695688-3b8985780d6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBtYXJrZXRpbmclMjBhZmZpbGlhdGUlMjBwYXJ0bmVyc2hpcCUyMGlsbHVzdHJhdGlvbiUyMHdpdGglMjBwZW9wbGUlMjBleGNoYW5naW5nJTIwdmFsdWV8ZW58MHx8fHwxNzQ1MzQyMDg2fDA&ixlib=rb-4.0.3&q=80&w=1080" 
            src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=40&height=40" 
            alt="ZAPT Logo" 
            className="w-8 h-8"
          />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              The Premiere Affiliate Marketplace for Apps
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              An exclusive platform designed to create valuable connections that drive growth and revenue.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-soft p-8 transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Verified Quality</h3>
              <p className="text-secondary-600">
                Every program is thoroughly vetted to ensure quality, legitimacy, and favorable terms for affiliates.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-soft p-8 transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Recurring Revenue</h3>
              <p className="text-secondary-600">
                Focus on recurring commission structures that provide sustainable, long-term income opportunities.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-soft p-8 transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Direct Connections</h3>
              <p className="text-secondary-600">
                Connect directly with app creators without intermediaries, maximizing your earnings potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For App Creators & Content Creators Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Something for Everyone
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Tailored benefits for both app creators and content creators.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-soft p-8 border-t-4 border-primary-600 transition-all hover:shadow-lg">
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">For App Creators</h3>
              <p className="text-secondary-600 mb-6">
                Expand your reach through a network of motivated content creators who can promote your app to their engaged audiences.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-secondary-700">Showcase your app to qualified content creators</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-secondary-700">Gain trusted promotion from authentic voices</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-secondary-700">Only pay for results, not impressions</span>
                </li>
              </ul>
              <Link 
                to="/login" 
                className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md shadow-sm font-medium transition-colors cursor-pointer"
              >
                Register & Submit
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft p-8 border-t-4 border-accent-500 transition-all hover:shadow-lg">
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">For Content Creators</h3>
              <p className="text-secondary-600 mb-6">
                Discover premium affiliate programs with favorable commission structures and recurring revenue models.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-secondary-700">Access verified, high-quality affiliate opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-secondary-700">No registration required to browse opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-secondary-700">Focus on recurring income opportunities</span>
                </li>
              </ul>
              <Link 
                to="/marketplace" 
                className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-md shadow-sm font-medium transition-colors cursor-pointer"
              >
                Browse Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              A simple process designed to create quality connections and valuable partnerships.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-primary-200 transform -translate-x-1/2 hidden md:block"></div>
              
              {/* Step 1 */}
              <div className="relative z-10 flex flex-col md:flex-row items-center mb-12 md:mb-20">
                <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1 mt-6 md:mt-0">
                  <h3 className="text-2xl font-bold text-secondary-900 mb-3">Submit Your App</h3>
                  <p className="text-secondary-600">
                    App creators register and submit their affiliate program details including commission structure and payment terms.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-start md:justify-center order-1 md:order-2">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg z-10">
                    1
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative z-10 flex flex-col md:flex-row items-center mb-12 md:mb-20">
                <div className="md:w-1/2 flex justify-end md:justify-center order-1">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg z-10">
                    2
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 order-2 mt-6 md:mt-0">
                  <h3 className="text-2xl font-bold text-secondary-900 mb-3">Review Process</h3>
                  <p className="text-secondary-600">
                    Our team carefully verifies each program to ensure quality, favorable terms, and legitimacy before approval.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative z-10 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1 mt-6 md:mt-0">
                  <h3 className="text-2xl font-bold text-secondary-900 mb-3">Connect & Grow</h3>
                  <p className="text-secondary-600">
                    Approved programs appear in our marketplace, connecting app creators with content creators for mutual growth.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-start md:justify-center order-1 md:order-2">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg z-10">
                    3
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start?</h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
            Join our marketplace today and start building valuable partnerships that drive growth and revenue.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/marketplace" 
              className="bg-white text-primary-700 hover:bg-primary-50 px-6 py-3 rounded-md shadow-md font-bold transition-colors cursor-pointer"
            >
              Browse Marketplace
            </Link>
            <Link 
              to="/login" 
              className="bg-transparent hover:bg-primary-500 border-2 border-white text-white px-6 py-3 rounded-md shadow-md font-bold transition-colors cursor-pointer"
            >
              Submit Your Program
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
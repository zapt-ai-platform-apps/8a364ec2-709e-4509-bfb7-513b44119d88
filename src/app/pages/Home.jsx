import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/app/components/layout/Layout';
import { MarketplaceHighlights } from '@/modules/affiliatePrograms/ui';
import { useAuth } from '@/shared/hooks/useAuth';
import WaitlistModal from '@/modules/affiliatePrograms/ui/marketplace/WaitlistModal';

export default function Home() {
  const { user } = useAuth();
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const heroRef = useRef(null);
  
  useEffect(() => {
    // Parallax and animation effects on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroElements = document.querySelectorAll('.hero-animate');
      
      heroElements.forEach(el => {
        el.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        el.style.opacity = 1 - (scrollPosition * 0.0015);
      });
      
      // Animate in sections as they come into view
      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
          section.classList.add('animate-in');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-radial from-primary-50 to-transparent opacity-70"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-r from-blue-300/30 to-purple-400/30 blur-3xl"></div>
        <div className="absolute top-1/3 -right-48 w-96 h-96 rounded-full bg-gradient-to-l from-indigo-300/30 to-blue-200/30 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-pink-200/30 to-indigo-300/30 blur-3xl"></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center py-20 overflow-hidden" ref={heroRef}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Hero Content */}
            <div className="w-full lg:w-1/2 hero-animate">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-gradient-to-r from-amber-400 to-amber-300 text-amber-900 px-4 py-1 rounded-full text-sm font-semibold animate-pulse flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.003-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                  <span>Coming Soon</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600 bg-clip-text text-transparent">
                Build Recurring Income With Every Referral
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 max-w-lg">
                The <span className="font-bold">ZAPT Affiliate Marketplace</span> connects you with quality apps offering verified <span className="font-semibold text-primary-600">lifetime commissions</span>. No scams. Just real income opportunities.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/marketplace" className="bg-gradient-to-r from-primary-600 to-primary-800 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  Browse Apps
                </Link>
                <button
                  onClick={() => setIsWaitlistModalOpen(true)}
                  className="bg-white text-primary-700 border-2 border-primary-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  Join Waitlist
                </button>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>30%+ Commissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Lifetime Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Quality Vetted Apps</span>
                </div>
              </div>
            </div>
            
            {/* Hero Image/Illustration */}
            <div className="w-full lg:w-1/2 hero-animate">
              <div className="relative mx-auto max-w-md lg:max-w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-200/20 to-accent-200/20 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">ZAPT App Marketplace</h3>
                      </div>
                      <div className="text-sm font-medium text-green-600 bg-green-50 py-1 px-3 rounded-full">
                        NEW
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-4 rounded-xl border border-primary-200">
                        <div className="flex justify-between items-start mb-3">
                          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="text-xs font-semibold text-primary-800 bg-white/60 py-1 px-2 rounded">
                            Lifetime
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">Revenue Share</h4>
                        <p className="text-sm text-gray-600">30-50% of customer payments for life</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-4 rounded-xl border border-accent-200">
                        <div className="flex justify-between items-start mb-3">
                          <div className="w-8 h-8 rounded-lg bg-accent-600 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="text-xs font-semibold text-accent-800 bg-white/60 py-1 px-2 rounded">
                            Verified
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">Quality Apps</h4>
                        <p className="text-sm text-gray-600">Personally tested by our team</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">AI Email Assistant</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">50% commission</div>
                            <div className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">$49/mo</div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent font-medium">$24.50 monthly per customer</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Link 
                        to="/marketplace" 
                        className="inline-flex items-center justify-center py-2 px-5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-all cursor-pointer"
                      >
                        View All Apps
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-700 to-accent-700 bg-clip-text text-transparent">
              Why Choose ZAPT Affiliate Marketplace
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built a marketplace that solves the real problems affiliates face.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="group rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-all duration-300 animate-on-scroll">
              <div className="h-3 bg-gradient-to-r from-primary-500 to-primary-700"></div>
              <div className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary-100 mb-6 flex items-center justify-center group-hover:bg-primary-200 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                  Lifetime Commissions
                </h3>
                
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Minimum 30% commission rate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Recurring revenue monthly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Growing income over time</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="group rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-all duration-300 animate-on-scroll delay-150">
              <div className="h-3 bg-gradient-to-r from-accent-500 to-accent-700"></div>
              <div className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-accent-100 mb-6 flex items-center justify-center group-hover:bg-accent-200 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-accent-700 transition-colors duration-300">
                  Verified Quality Apps
                </h3>
                
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Personally tested by our team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Solutions with real value</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Confidently recommend apps</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="group rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-all duration-300 animate-on-scroll delay-300">
              <div className="h-3 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <div className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-purple-100 mb-6 flex items-center justify-center group-hover:bg-purple-200 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                  Secure Payments
                </h3>
                
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>On-time guaranteed payments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Direct payment control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Transparent commission tracking</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-24 relative bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-on-scroll">
            <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              How It Works
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute top-24 left-[calc(16.66%+8px)] right-[calc(16.66%+8px)] h-0.5 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500"></div>
            
            {/* Step 1 */}
            <div className="relative flex flex-col items-center animate-on-scroll">
              <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center text-xl font-bold mb-8 z-10 shadow-lg">1</div>
              <div className="rounded-xl bg-white p-6 shadow-lg text-center h-full w-full border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Quality Apps</h3>
                <p className="text-gray-600">Browse our marketplace of personally tested apps that solve real problems.</p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative flex flex-col items-center animate-on-scroll delay-150">
              <div className="w-16 h-16 rounded-full bg-accent-600 text-white flex items-center justify-center text-xl font-bold mb-8 z-10 shadow-lg">2</div>
              <div className="rounded-xl bg-white p-6 shadow-lg text-center h-full w-full border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Share With Your Audience</h3>
                <p className="text-gray-600">Promote apps through your content, marketing channels, or advertising campaigns.</p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative flex flex-col items-center animate-on-scroll delay-300">
              <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold mb-8 z-10 shadow-lg">3</div>
              <div className="rounded-xl bg-white p-6 shadow-lg text-center h-full w-full border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Earn Lifetime Commissions</h3>
                <p className="text-gray-600">Get 30-50% of what your referrals pay, month after month, for life.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Marketplace Comparison */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-700 to-primary-700 bg-clip-text text-transparent">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare our marketplace to traditional affiliate programs
            </p>
          </div>
          
          <MarketplaceHighlights />
        </div>
      </section>
      
      {/* App Creator Section */}
      <section className="py-24 relative bg-gradient-to-b from-white to-primary-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="w-full lg:w-1/2 p-8 lg:p-12 animate-on-scroll">
                <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-6">
                  For App Creators
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
                  Get Your App Promoted By Content Creators
                </h2>
                <p className="text-gray-600 mb-8">
                  Connect with motivated affiliates ready to recommend your solution to their engaged audiences.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Instant Access to Affiliates</h3>
                      <p className="text-gray-600">Reach content creators actively seeking quality apps</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Quality Partnerships</h3>
                      <p className="text-gray-600">Build sustainable growth through trusted promoters</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Simple Management</h3>
                      <p className="text-gray-600">Our platform handles tracking, attribution and payments</p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsWaitlistModalOpen(true)}
                  className="bg-gradient-to-r from-primary-600 to-primary-800 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  List Your App
                </button>
              </div>
              
              <div className="w-full lg:w-1/2 bg-gradient-to-br from-primary-600 to-accent-600 p-8 lg:p-12 text-white flex items-center animate-on-scroll delay-150">
                <div>
                  <div className="w-16 h-16 bg-white/20 rounded-xl mb-8 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">The ZAPT Platform Advantage</h3>
                  
                  <p className="mb-6 text-white/90 text-lg">
                    All apps in our marketplace are built on the ZAPT platform:
                  </p>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Stripe Connect integration ensures affiliates always receive their earned commissions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Transparent reporting and real-time analytics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Direct control over app creators' payment accounts</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-accent-700 opacity-95"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-white"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 animate-on-scroll">
              Start Building Your Affiliate Income
            </h2>
            <p className="text-xl text-white/80 mb-10 animate-on-scroll delay-100">
              Join our marketplace today and discover quality apps with lifetime commissions
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll delay-200">
              <Link to="/marketplace" className="transform transition-all duration-300 hover:scale-105 bg-white text-primary-700 px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl cursor-pointer">
                Browse Affiliate Apps
              </Link>
              <button
                onClick={() => setIsWaitlistModalOpen(true)}
                className="transform transition-all duration-300 hover:scale-105 bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl cursor-pointer"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={isWaitlistModalOpen} 
        onClose={() => setIsWaitlistModalOpen(false)}
        userEmail={user?.email || ''}
      />
    </Layout>
  );
}
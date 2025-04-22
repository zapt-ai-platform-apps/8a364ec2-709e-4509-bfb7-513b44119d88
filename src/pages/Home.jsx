import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import MarketplaceHighlights from '@/components/home/MarketplaceHighlights';

export default function Home() {
  const heroRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroElements = document.querySelectorAll('.hero-animate');
      
      heroElements.forEach(el => {
        el.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        el.style.opacity = 1 - (scrollPosition * 0.001);
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
      {/* Decorative elements that stay fixed in background */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-50 to-purple-50 -z-10"></div>
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-gradient-to-r from-blue-300 to-purple-400 blur-3xl"></div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-gradient-to-l from-indigo-300 to-blue-200 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-gradient-to-tr from-pink-200 to-indigo-300 blur-3xl"></div>
      </div>
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-primary-400"></div>
          <div className="absolute top-40 right-20 w-24 h-24 rounded-full border-2 border-accent-400"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full border-2 border-primary-600"></div>
          <div className="absolute bottom-40 right-1/3 w-20 h-20 rounded-full border-2 border-accent-600"></div>
        </div>
        
        <div className="max-w-7xl mx-auto mb-16 relative z-10">
          <div className="mb-4 inline-block">
            <div className="bg-gradient-to-r from-primary-600 to-accent-500 text-white py-2 px-6 rounded-full inline-block shadow-lg mb-8 animate-fade-in-down">
              <span className="text-sm md:text-base font-semibold">The Affiliate Marketplace of the Future</span>
            </div>
          </div>
          
          <h1 className="hero-animate text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-700 via-accent-600 to-primary-800 leading-tight">
            ZAPT Affiliate<br/><span className="text-4xl md:text-6xl lg:text-7xl">Marketplace</span>
          </h1>
          
          <p className="hero-animate text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
            Where innovative app creators and savvy content creators forge 
            powerful partnerships that drive <span className="text-primary-700 font-semibold">mutual growth</span>.
          </p>
          
          <div className="hero-animate flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Link to="/marketplace" className="transform transition-all duration-300 hover:scale-105 bg-gradient-to-r from-primary-600 to-primary-800 text-white px-8 py-4 rounded-xl text-lg md:text-xl font-bold shadow-xl hover:shadow-2xl cursor-pointer w-64 text-center">
              Browse Programs
            </Link>
            <Link to="/login" className="transform transition-all duration-300 hover:scale-105 bg-white text-primary-700 border-2 border-primary-600 px-8 py-4 rounded-xl text-lg md:text-xl font-bold shadow hover:shadow-xl cursor-pointer w-64 text-center">
              Join Now
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
      
      {/* Marketplace Highlights Section */}
      <MarketplaceHighlights />
      
      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-600 to-primary-700">
              Your Affiliate Journey Starts Here
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-500 to-primary-600 rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl text-center">
              Our platform bridges the gap between quality apps and content creators seeking genuine affiliate opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto">
            <div className="relative group animate-on-scroll">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl transform rotate-2 scale-105 opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
              <div className="bg-white backdrop-blur-sm bg-opacity-90 p-10 rounded-2xl shadow-xl border border-gray-100 transform transition-transform duration-300 group-hover:-translate-y-2 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-8 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">App Creators</h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Showcase your app's affiliate program in front of motivated content creators who are
                  ready to promote quality products to their audience.
                </p>
                <div className="space-y-4 mb-10">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600">✓</span>
                    </div>
                    <span className="text-gray-700">Curated marketplace presence</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600">✓</span>
                    </div>
                    <span className="text-gray-700">Verified partnerships</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600">✓</span>
                    </div>
                    <span className="text-gray-700">Transparent commission structure</span>
                  </div>
                </div>
                <Link to="/login" className="inline-block w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl text-center font-semibold shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer">
                  Register Your App
                </Link>
              </div>
            </div>
            
            <div className="relative group animate-on-scroll delay-150">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-red-500 rounded-2xl transform -rotate-2 scale-105 opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
              <div className="bg-white backdrop-blur-sm bg-opacity-90 p-10 rounded-2xl shadow-xl border border-gray-100 transform transition-transform duration-300 group-hover:-translate-y-2 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-500 to-red-500 flex items-center justify-center mb-8 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Content Creators</h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Access our curated selection of legitimate affiliate programs with fair commission structures and recurring income potential.
                </p>
                <div className="space-y-4 mb-10">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-100 flex items-center justify-center mr-3">
                      <span className="text-accent-600">✓</span>
                    </div>
                    <span className="text-gray-700">No registration required</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-100 flex items-center justify-center mr-3">
                      <span className="text-accent-600">✓</span>
                    </div>
                    <span className="text-gray-700">Quality, vetted opportunities</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-100 flex items-center justify-center mr-3">
                      <span className="text-accent-600">✓</span>
                    </div>
                    <span className="text-gray-700">Focus on recurring revenue</span>
                  </div>
                </div>
                <Link to="/marketplace" className="inline-block w-full bg-gradient-to-r from-accent-500 to-red-500 text-white py-4 px-6 rounded-xl text-center font-semibold shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer">
                  Browse Marketplace
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section - REDESIGNED */}
      <section className="py-24 relative">
        <div className="absolute left-0 right-0 h-full bg-gradient-to-b from-white via-primary-50 to-white -z-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-accent-600">
              How It Works
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl text-center">
              A simple, transparent process that brings together app creators and content creators.
            </p>
          </div>
          
          {/* New Card-Based Design */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 group animate-on-scroll">
                <div className="h-3 bg-gradient-to-r from-primary-500 to-primary-700"></div>
                <div className="p-8">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-all duration-300">
                    <div className="text-2xl font-bold text-primary-700 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow">1</div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span>Submit Your App</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    App creators register and submit their affiliate program details for our review process.
                  </p>
                  
                  <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Create your account</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Provide program details</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Set commission structure</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary-50 p-5 border-t border-primary-100">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">For App Creators</div>
                      <div className="text-xs text-gray-500">Showcase your affiliate program</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 group animate-on-scroll delay-150">
                <div className="h-3 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-all duration-300">
                    <div className="text-2xl font-bold text-blue-700 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow">2</div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span>We Review</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    Our team carefully verifies each program's quality and legitimacy before approval.
                  </p>
                  
                  <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Verify program authenticity</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Evaluate commission fairness</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Check promotional materials</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-5 border-t border-blue-100">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">Quality Assurance</div>
                      <div className="text-xs text-gray-500">Only the best make it through</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 group animate-on-scroll delay-300">
                <div className="h-3 bg-gradient-to-r from-accent-500 to-red-500"></div>
                <div className="p-8">
                  <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent-200 transition-all duration-300">
                    <div className="text-2xl font-bold text-accent-700 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow">3</div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span>Connect</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-600 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    Approved programs appear in our marketplace, connecting app and content creators.
                  </p>
                  
                  <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Featured in marketplace</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Direct access for affiliates</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Start earning commissions</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-accent-50 p-5 border-t border-accent-100">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">Win-Win Partnerships</div>
                      <div className="text-xs text-gray-500">Mutual success for everyone</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Growth Indicator */}
            <div className="flex justify-center mt-16 animate-on-scroll delay-200">
              <div className="bg-white rounded-xl shadow-lg px-8 py-6 flex flex-col sm:flex-row items-center gap-6 max-w-2xl transform transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">Growing Together</h4>
                  <p className="text-gray-600">
                    Our platform continuously evolves to deliver better opportunities for both app creators and content creators.
                  </p>
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
              Ready to Join the Future of Affiliate Marketing?
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-12 animate-on-scroll delay-100">
              Whether you're an app creator looking to grow or a content creator seeking quality opportunities, 
              ZAPT Affiliate Marketplace is the platform you've been waiting for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll delay-200">
              <Link to="/login" className="transform transition-all duration-300 hover:scale-105 bg-white text-primary-700 px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl cursor-pointer">
                Join as App Creator
              </Link>
              <Link to="/marketplace" className="transform transition-all duration-300 hover:scale-105 bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl cursor-pointer">
                Browse Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CSS for animations */}
      <style jsx>{`
        .animate-fade-in-down {
          animation: fadeInDown 1s ease forwards;
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .delay-100 {
          transition-delay: 0.1s;
        }
        
        .delay-150 {
          transition-delay: 0.15s;
        }
        
        .delay-200 {
          transition-delay: 0.2s;
        }
        
        .delay-300 {
          transition-delay: 0.3s;
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Layout>
  );
}
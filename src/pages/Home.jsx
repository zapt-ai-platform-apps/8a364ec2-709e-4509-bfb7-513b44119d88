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
              <span className="text-sm md:text-base font-semibold">The Premier Affiliate Platform for ZAPT-built Apps</span>
            </div>
          </div>
          
          <h1 className="hero-animate text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-700 via-accent-600 to-primary-800 leading-tight">
            ZAPT Affiliate<br/><span className="text-4xl md:text-6xl lg:text-7xl">Marketplace</span>
          </h1>
          
          <p className="hero-animate text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
            We connect affiliates with high-quality ZAPT-built apps offering <span className="text-primary-700 font-semibold">verified recurring commissions</span>. 
            No middlemen. No barriers. Just real income opportunities.
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
      
      {/* Affiliate Benefits Section - NEW */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-on-scroll">
              <span className="bg-accent-100 text-accent-800 text-sm font-semibold px-4 py-2 rounded-full inline-block mb-4">
                For Affiliates
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-700 to-primary-600">
                Why Choose ZAPT Affiliate Marketplace?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We've built the marketplace affiliates deserve - with vetted, quality programs and real advocacy for your success.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white rounded-xl shadow-md p-8 transform transition-all duration-300 hover:-translate-y-2 animate-on-scroll">
                <div className="w-16 h-16 bg-accent-100 rounded-lg mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Vetted ZAPT Apps Only
                </h3>
                <p className="text-gray-600 mb-6">
                  We only list quality apps built on the ZAPT platform that have passed our strict review process. No scams, no false promises.
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <Link to="/marketplace" className="text-accent-600 hover:text-accent-800 font-medium flex items-center">
                    <span>See verified programs</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-8 transform transition-all duration-300 hover:-translate-y-2 animate-on-scroll delay-150">
                <div className="w-16 h-16 bg-primary-100 rounded-lg mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Recurring Commission Focus
                </h3>
                <p className="text-gray-600 mb-6">
                  We prioritize apps with recurring commission models to help you build stable, predictable monthly income instead of one-time payouts.
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <Link to="/marketplace" className="text-primary-600 hover:text-primary-800 font-medium flex items-center">
                    <span>Explore recurring programs</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-8 transform transition-all duration-300 hover:-translate-y-2 animate-on-scroll delay-300">
                <div className="w-16 h-16 bg-purple-100 rounded-lg mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Direct Advocacy Support
                </h3>
                <p className="text-gray-600 mb-6">
                  We actively advocate for affiliates by negotiating better terms, providing promotional materials, and ensuring fair treatment.
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <Link to="/marketplace" className="text-purple-600 hover:text-purple-800 font-medium flex items-center">
                    <span>See how we help</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-16 animate-on-scroll delay-200">
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                As a content creator, you already invest time building your audience. 
                We help you monetize that investment with quality affiliate partnerships that generate sustainable income.
              </p>
              <Link to="/marketplace" className="inline-block bg-gradient-to-r from-accent-600 to-primary-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                Find Affiliate Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* App Creator Section */}
      <section className="py-24 relative">
        <div className="absolute left-0 right-0 h-full bg-gradient-to-b from-white via-primary-50 to-white -z-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center mb-16 animate-on-scroll">
            <span className="bg-primary-100 text-primary-800 text-sm font-semibold px-4 py-2 rounded-full inline-block mb-4">
              For App Creators
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">
              Get Your ZAPT App Promoted
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl text-center">
              List your ZAPT-built app's affiliate program and connect with motivated content creators ready to promote your solution.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-2 animate-on-scroll">
                <div className="flex gap-5 mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Access to Affiliates</h3>
                    <p className="text-gray-600">
                      Get your app in front of motivated content creators actively seeking quality programs to promote to their audiences.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-5 mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Over Quantity</h3>
                    <p className="text-gray-600">
                      Our marketplace focuses on quality partnerships that drive sustainable growth, not one-time promotions.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link to="/login" className="inline-block w-full bg-gradient-to-r from-primary-600 to-primary-800 text-white py-4 px-6 rounded-xl text-center font-semibold shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer">
                    List Your Affiliate Program
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-2 animate-on-scroll delay-150">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What Makes Our Marketplace Different</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-4 mt-1">
                      <span className="text-green-600">✓</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">ZAPT-Focused</h4>
                      <p className="text-gray-600">We exclusively feature apps built on the ZAPT platform, ensuring quality and reliability.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-4 mt-1">
                      <span className="text-green-600">✓</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Direct Connections</h4>
                      <p className="text-gray-600">We connect you directly with affiliates - no middlemen taking additional cuts of your revenue.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-4 mt-1">
                      <span className="text-green-600">✓</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Simple Process</h4>
                      <p className="text-gray-600">Our straightforward approval process gets quality programs listed quickly without unnecessary hurdles.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-4 mt-1">
                      <span className="text-green-600">✓</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Transparent Terms</h4>
                      <p className="text-gray-600">We ensure every program has clear, fair terms that benefit both you and your affiliates.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section - REDESIGNED */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-accent-600">
              How It Works
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl text-center">
              A simple, direct process that connects ZAPT app creators with motivated affiliates.
            </p>
          </div>
          
          {/* Card-Based Design */}
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
                    <span>App Submission</span>
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    ZAPT app creators submit their affiliate program for our review. We verify quality, terms, and commission structure.
                  </p>
                  
                  <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Easy online submission</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Clear commission details</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>ZAPT app verification</span>
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
                    <span>Affiliate Matching</span>
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    We showcase approved programs to our network of affiliates, highlighting their unique benefits and commission structure.
                  </p>
                  
                  <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Featured marketplace listing</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Direct affiliate discovery</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>No additional platform fees</span>
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
                    <span>Ongoing Support</span>
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    We provide continuous support to both app creators and affiliates, ensuring successful long-term partnerships.
                  </p>
                  
                  <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Affiliate advocacy</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Program promotion guidance</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Commission dispute resolution</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* What Makes Us Different - NEW */}
      <section className="py-24 relative bg-gradient-to-b from-white via-accent-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-16 animate-on-scroll">
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-700 to-primary-600">
                What Makes ZAPT Affiliate Marketplace Different
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-600 to-primary-500 rounded-full mb-8"></div>
              <p className="text-xl text-gray-600 max-w-3xl text-center">
                We're not just another affiliate platform. We've reimagined the entire relationship between apps and affiliates.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-on-scroll">
              <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Traditional Affiliate Networks</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Multiple layers of middlemen taking cuts of commissions</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Minimal quality control - anyone can list anything</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Platforms prioritize one-time sales over sustainable recurring revenue</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-600">No advocacy for affiliates when issues arise</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Generic, scattered programs with no clear focus</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden animate-on-scroll delay-150">
                <div className="absolute top-0 left-0 w-2 h-full bg-green-500"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">ZAPT Affiliate Marketplace</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Direct access - no intermediaries taking extra cuts</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Strict quality vetting - only ZAPT apps that meet our standards</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Focus on recurring revenue models for sustainable affiliate income</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Active affiliate advocacy with dispute resolution support</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Specialized focus on high-quality ZAPT apps with proven track records</p>
                  </div>
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
              Join the ZAPT Affiliate Ecosystem
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-12 animate-on-scroll delay-100">
              Whether you're an affiliate seeking quality programs or a ZAPT app creator looking to expand your reach, 
              our marketplace connects you directly with the right partners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll delay-200">
              <Link to="/marketplace" className="transform transition-all duration-300 hover:scale-105 bg-white text-primary-700 px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl cursor-pointer">
                Browse Affiliate Programs
              </Link>
              <Link to="/login" className="transform transition-all duration-300 hover:scale-105 bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl cursor-pointer">
                List Your App
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
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
      
      {/* How It Works Section - FIXED ALIGNMENT */}
      <section className="py-24 relative">
        <div className="absolute left-0 right-0 h-full bg-gradient-to-b from-white via-primary-50 to-white -z-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center mb-20 animate-on-scroll">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-accent-600">
              How It Works
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl text-center">
              A simple, transparent process that brings together app creators and content creators.
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Desktop Timeline View */}
            <div className="hidden md:block">
              {/* Connecting Line */}
              <div className="absolute left-1/2 top-12 bottom-12 w-1 bg-gradient-to-b from-primary-500 to-accent-500 transform -translate-x-1/2 z-0 rounded-full"></div>
              
              {/* Step 1: Submit Your App */}
              <div className="flex justify-end mb-20">
                <div className="w-1/2 pr-12 relative">
                  <div className="absolute right-0 top-10 w-12 h-12 rounded-full bg-white border-4 border-primary-500 z-10 transform translate-x-6"></div>
                  <div className="bg-white p-8 rounded-2xl shadow-xl animate-on-scroll">
                    <h3 className="text-2xl font-bold text-primary-700 mb-4">Submit Your App</h3>
                    <p className="text-gray-600 text-lg">
                      App creators register and submit their affiliate program details for our review process. We look for quality apps with fair commission structures.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Step 2: We Review */}
              <div className="flex justify-start mb-20">
                <div className="w-1/2 pl-12 relative">
                  <div className="absolute left-0 top-10 w-12 h-12 rounded-full bg-white border-4 border-primary-600 z-10 transform -translate-x-6"></div>
                  <div className="bg-white p-8 rounded-2xl shadow-xl animate-on-scroll delay-150">
                    <h3 className="text-2xl font-bold text-primary-700 mb-4">We Review</h3>
                    <p className="text-gray-600 text-lg">
                      Our team carefully verifies each program's quality and legitimacy, ensuring that only the best opportunities make it to our marketplace.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Step 3: Connect */}
              <div className="flex justify-end">
                <div className="w-1/2 pr-12 relative">
                  <div className="absolute right-0 top-10 w-12 h-12 rounded-full bg-white border-4 border-accent-500 z-10 transform translate-x-6"></div>
                  <div className="bg-white p-8 rounded-2xl shadow-xl animate-on-scroll delay-300">
                    <h3 className="text-2xl font-bold text-primary-700 mb-4">Connect</h3>
                    <p className="text-gray-600 text-lg">
                      Approved programs appear in our marketplace, connecting app creators with content creators who can promote their products.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Timeline View */}
            <div className="md:hidden space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl animate-on-scroll">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-xl mr-4">1</div>
                  <h3 className="text-2xl font-bold text-primary-700">Submit Your App</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  App creators register and submit their affiliate program details for our review process. We look for quality apps with fair commission structures.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-xl animate-on-scroll delay-150">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-xl mr-4">2</div>
                  <h3 className="text-2xl font-bold text-primary-700">We Review</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Our team carefully verifies each program's quality and legitimacy, ensuring that only the best opportunities make it to our marketplace.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-xl animate-on-scroll delay-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent-500 text-white flex items-center justify-center font-bold text-xl mr-4">3</div>
                  <h3 className="text-2xl font-bold text-primary-700">Connect</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Approved programs appear in our marketplace, connecting app creators with content creators who can promote their products.
                </p>
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
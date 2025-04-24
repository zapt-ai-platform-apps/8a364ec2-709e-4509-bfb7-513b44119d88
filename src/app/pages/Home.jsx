import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/app/components/layout/Layout';
import { MarketplaceHighlights } from '@/modules/affiliatePrograms/ui';
import { useAuth } from '@/shared/hooks/useAuth';
import WaitlistModal from '@/modules/affiliatePrograms/ui/marketplace/WaitlistModal';

export default function Home() {
  const { user } = useAuth();
  const heroRef = useRef(null);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  
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
          <h1 className="hero-animate text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-700 via-accent-600 to-primary-800 leading-tight">
            ZAPT Affiliate<br/><span className="text-4xl md:text-6xl lg:text-7xl">Marketplace</span>
          </h1>
          
          <div className="hero-animate inline-block bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-md px-4 py-2 mb-6">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="font-medium">Coming Soon</span>
            </div>
          </div>
          
          <p className="hero-animate text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
            Build Recurring Income With Every Referral
          </p>
          
          <p className="hero-animate text-lg text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            We connect content creators and traditional marketers with quality apps offering verified <span className="font-semibold">lifetime commissions</span>. No scams. No false promises. Just real income opportunities.
          </p>
          
          <div className="hero-animate flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Link to="/marketplace" className="transform transition-all duration-300 hover:scale-105 bg-gradient-to-r from-primary-600 to-primary-800 text-white px-8 py-4 rounded-xl text-lg md:text-xl font-bold shadow-xl hover:shadow-2xl cursor-pointer w-64 text-center">
              Browse Apps
            </Link>
            <button
              onClick={() => setIsWaitlistModalOpen(true)}
              className="transform transition-all duration-300 hover:scale-105 bg-white text-primary-700 border-2 border-primary-600 px-8 py-4 rounded-xl text-lg md:text-xl font-bold shadow hover:shadow-xl cursor-pointer w-64 text-center"
            >
              Join Waitlist
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
      
      {/* For Content Creators & Traditional Marketers Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-on-scroll">
              <span className="bg-accent-100 text-accent-800 text-sm font-semibold px-4 py-2 rounded-full inline-block mb-4">
                For Content Creators & Traditional Marketers
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-700 to-primary-600">
                Why Our Marketplace Matters
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We've built what affiliates have been asking for - reliable income from products worth promoting.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="relative group overflow-hidden rounded-xl shadow-md transform transition-all duration-500 hover:-translate-y-2 animate-on-scroll">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-accent-700/20 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
                <div className="bg-white p-8 relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-accent-100 mb-6 relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-200 to-accent-100"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-accent-700 transition-colors duration-300">
                    Lifetime Commissions
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-600">Minimum 30% commission rate</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-600">Recurring revenue month after month</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-600">Stable income that grows over time</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative group overflow-hidden rounded-xl shadow-md transform transition-all duration-500 hover:-translate-y-2 animate-on-scroll delay-150">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-700/20 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
                <div className="bg-white p-8 relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-primary-100 mb-6 relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-100"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                    Verified Quality Apps
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-600">Personally tested by our team</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-600">Solutions with real user value</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-600">Products you can confidently recommend</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative group overflow-hidden rounded-xl shadow-md transform transition-all duration-500 hover:-translate-y-2 animate-on-scroll delay-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-700/20 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
                <div className="bg-white p-8 relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-purple-100 mb-6 relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-purple-100"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                    Secure Payment System
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-600">On-time, guaranteed payments</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-600">Direct payment account control</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-600">Transparent commission tracking</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-16 animate-on-scroll delay-200">
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Already Creating Content?</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  You've built an audience. You make videos, post on social media, or run communities. Now monetize that investment with partnerships that generate predictable monthly income.
                </p>
                <Link to="/marketplace" className="inline-block bg-gradient-to-r from-accent-600 to-primary-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  Find Affiliate Apps
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-accent-600">
              How It Works
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full mb-8"></div>
          </div>
          
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
                    <span>Choose Quality Apps</span>
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    Browse our curated marketplace of proven apps that solve real problems.
                  </p>
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
                    <span>Share With Your Audience</span>
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    Promote apps that align with your content using your own authentic voice.
                  </p>
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
                    <span>Earn Lifetime Commissions</span>
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    Get at least 30% of what your referrals pay, month after month, for as long as they remain customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* What Makes Our Marketplace Different */}
      <section className="py-24 relative bg-gradient-to-b from-white via-accent-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-16 animate-on-scroll">
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-700 to-primary-600">
                What Makes Our Marketplace Different
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-600 to-primary-500 rounded-full mb-8"></div>
            </div>
            
            <MarketplaceHighlights />
          </div>
        </div>
      </section>
      
      {/* App Creator Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center mb-16 animate-on-scroll">
            <span className="bg-primary-100 text-primary-800 text-sm font-semibold px-4 py-2 rounded-full inline-block mb-4">
              For App Developers
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">
              Get Your App Promoted
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl text-center">
              Connect with motivated content creators ready to recommend your solution to their engaged audiences.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md p-8 transform transition-all duration-300 hover:-translate-y-2 animate-on-scroll">
                <div className="w-16 h-16 bg-primary-100 rounded-lg mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Instant Access to Affiliates
                </h3>
                <p className="text-gray-600 mb-6">
                  Reach content creators actively seeking quality apps
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-8 transform transition-all duration-300 hover:-translate-y-2 animate-on-scroll delay-150">
                <div className="w-16 h-16 bg-primary-100 rounded-lg mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Quality Partnerships
                </h3>
                <p className="text-gray-600 mb-6">
                  Build sustainable growth through trusted promoters
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-8 transform transition-all duration-300 hover:-translate-y-2 animate-on-scroll delay-300">
                <div className="w-16 h-16 bg-primary-100 rounded-lg mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Simple Management
                </h3>
                <p className="text-gray-600 mb-6">
                  Our platform handles tracking, attribution and payments
                </p>
              </div>
            </div>
            
            <div className="text-center mt-16 animate-on-scroll delay-200">
              <button
                onClick={() => setIsWaitlistModalOpen(true)}
                className="inline-block bg-gradient-to-r from-primary-600 to-primary-800 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                List Your App
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Platform Details */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 text-lg italic animate-on-scroll">
              All apps in our marketplace are built on the ZAPT platform. We maintain direct control over app creators' payment accounts through Stripe Connect integration, ensuring affiliates always receive their earned commissions.
            </p>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll delay-200">
              <Link to="/marketplace" className="transform transition-all duration-300 hover:scale-105 bg-white text-primary-700 px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl cursor-pointer">
                Browse Affiliate Apps
              </Link>
              <Link to="/login" className="transform transition-all duration-300 hover:scale-105 bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl cursor-pointer">
                Join Now
              </Link>
              <button
                onClick={() => setIsWaitlistModalOpen(true)}
                className="transform transition-all duration-300 hover:scale-105 bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl cursor-pointer"
              >
                Contact Us
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
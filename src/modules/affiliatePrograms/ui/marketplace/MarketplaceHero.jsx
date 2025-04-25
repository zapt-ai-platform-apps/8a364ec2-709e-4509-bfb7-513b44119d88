import React, { useState } from 'react';
import WaitlistModal from './WaitlistModal';
import { useAuth } from '@/shared/hooks/useAuth';

export default function MarketplaceHero({ searchTerm, onSearch, appCount }) {
  const { user } = useAuth();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchTerm);
  };

  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white">
      {/* Abstract shapes for visual interest */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 mix-blend-overlay">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent-400 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-primary-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-600 rounded-full filter blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Waitlist button with enhanced design */}
          <div className="flex justify-center mb-10">
            <button
              onClick={() => setIsWaitlistModalOpen(true)}
              className="group flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute h-3 w-3 rounded-full bg-accent-400 opacity-75"></span>
                  <span className="relative rounded-full h-3 w-3 bg-accent-500"></span>
                </span>
                <span className="text-sm font-medium text-white/90">Coming Soon</span>
              </div>
              <span className="w-px h-5 bg-white/30"></span>
              <span className="text-sm font-medium text-white group-hover:translate-x-0.5 transition-transform">
                Join Waitlist
                <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
              </span>
            </button>
          </div>

          {/* Title and subtitle with enhanced typography */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover Quality
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">Affiliate Programs</span>
                <svg className="absolute -bottom-2 md:-bottom-3 w-full" xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                  <path d="M1 5.61905C36.5238 3.57143 53.8095 9.85714 93.4048 10C139.286 10.1714 150.452 1 198.5 4.09524" stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="1" y1="6" x2="198.5" y2="6" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#60A5FA"/>
                      <stop offset="1" stopColor="#3B82F6"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Find verified apps offering lifetime commissions and real value for your audience.
            </p>
          </div>

          {/* Stats card */}
          {appCount > 0 && (
            <div className="flex justify-center mb-12">
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{appCount}</div>
                      <div className="text-xs text-white/70">Opportunities</div>
                    </div>
                  </div>
                  <div className="h-10 w-px bg-white/20"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">100% Verified</div>
                      <div className="text-xs text-white/70">By ZAPT Team</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced search box */}
          {appCount > 0 && (
            <div className="max-w-xl mx-auto">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search apps, commissions, or keywords..."
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                  className="w-full p-4 pl-12 pr-14 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-lg text-white placeholder-white/60 shadow-lg focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400/50 box-border"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button 
                  type="submit"
                  className="absolute inset-y-0 right-0 pr-4 pl-2 flex items-center cursor-pointer text-white/70 hover:text-white transition-colors"
                >
                  <span className="mr-2 text-sm font-medium hidden md:inline">Search</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={isWaitlistModalOpen} 
        onClose={() => setIsWaitlistModalOpen(false)}
        userEmail={user?.email || ''}
      />
    </section>
  );
}
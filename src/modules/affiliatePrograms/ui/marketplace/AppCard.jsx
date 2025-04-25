import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/shared/services/supabase';
import * as Sentry from "@sentry/browser";
import CommissionBadge from './CommissionBadge';
import { formatDate } from '@/shared/utils/dateUtils';

export default function AppCard({ app, user, favorites, onToggleFavorite }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [localFavorite, setLocalFavorite] = useState(null);
  
  // Extract commission percentage if available
  const commissionPercentage = extractCommissionPercentage(app.commissionStructure);
  
  // Determine if it's a recurring commission
  const isRecurring = isRecurringCommission(app.commissionStructure);
  
  // Check if this app is in favorites - ensure consistent type comparison
  // Use local state if available, otherwise use prop
  const isFavorite = localFavorite !== null 
    ? localFavorite 
    : favorites?.some(favId => Number(favId) === Number(app.id)) || false;

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user || isTogglingFavorite) return;
    
    try {
      // Set loading state
      setIsTogglingFavorite(true);
      
      // Optimistically update UI immediately
      const newFavoriteState = !isFavorite;
      setLocalFavorite(newFavoriteState);
      
      // Notify parent component of the change
      onToggleFavorite(app.id, newFavoriteState);
      
      // Make the API call in the background
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        console.error('No session access token available');
        // Revert UI changes if there's an issue
        setLocalFavorite(!newFavoriteState);
        onToggleFavorite(app.id, !newFavoriteState);
        return;
      }
      
      const response = await fetch('/api/toggleFavorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ appId: app.id }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to toggle favorite');
      }
      
      console.log(`App ${app.id} favorite toggled to ${data.isFavorite}`);
      
      // Update local state with server response
      // Only do this if the server returns a different state than what we expected
      if (data.isFavorite !== newFavoriteState) {
        setLocalFavorite(data.isFavorite);
        onToggleFavorite(app.id, data.isFavorite);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Sentry.captureException(error);
      
      // Revert to original state on error
      setLocalFavorite(!localFavorite);
      onToggleFavorite(app.id, !localFavorite);
    } finally {
      setIsTogglingFavorite(false);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden flex flex-col hover:shadow-lg transition-shadow border border-secondary-100">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-semibold text-secondary-900">{app.appName}</h2>
          <div className="flex items-center gap-2">
            {user && (
              <button 
                onClick={handleToggleFavorite}
                disabled={isTogglingFavorite}
                className={`transition-all duration-150 transform ${isTogglingFavorite ? 'opacity-50' : 'opacity-100'} text-secondary-500 hover:text-primary-600 focus:outline-none cursor-pointer`}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary-600">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                )}
              </button>
            )}
            <CommissionBadge percentage={commissionPercentage} isRecurring={isRecurring} />
          </div>
        </div>
        
        <p className={`text-secondary-600 mb-4 ${isExpanded ? '' : 'line-clamp-3'}`}>
          {app.appDescription}
        </p>
        
        {app.appDescription.length > 150 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium mb-4 cursor-pointer"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
        
        <div className="space-y-3 mb-4">
          <div>
            <h3 className="font-medium text-secondary-800 mb-1 text-sm">Commission Structure</h3>
            <p className="text-secondary-600 text-sm bg-secondary-50 p-2 rounded-md">
              {app.commissionStructure}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-secondary-800 mb-1 text-sm">Payment Terms</h3>
            <p className="text-secondary-600 text-sm bg-secondary-50 p-2 rounded-md">
              {app.paymentTerms}
            </p>
          </div>
        </div>
        
        <div className="text-xs text-secondary-500 mt-2">
          Listed on {formatDate(app.createdAt)}
        </div>
      </div>
      
      <div className="p-4 bg-secondary-50 mt-auto border-t border-secondary-100">
        <div className="flex flex-col sm:flex-row gap-3">
          <a 
            href={app.appUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-secondary-100 text-secondary-800 px-4 py-2 rounded-md text-sm text-center border border-secondary-200 transition-colors cursor-pointer flex-1 flex items-center justify-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Visit App</span>
          </a>
          
          {user ? (
            <div 
              className="bg-gray-100 relative overflow-hidden rounded-md text-sm text-center flex-1 flex items-center justify-center gap-1 group"
            >
              {/* Animated gradient background for the coming soon badge */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-85 animate-gradient-x"></div>
              
              <div className="relative flex items-center justify-center gap-1 px-4 py-2 text-white font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Coming Soon</span>
              </div>
            </div>
          ) : (
            <Link
              to={`/login?return_to=${encodeURIComponent('/marketplace')}`}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm text-center transition-colors cursor-pointer flex-1 flex items-center justify-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Login to Join</span>
            </Link>
          )}
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

// Helper function to extract commission percentage from text
function extractCommissionPercentage(text) {
  const match = text.match(/\b([1-9][0-9]|100)%\b/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
}

// Helper function to determine if commission is recurring
function isRecurringCommission(text) {
  const lowerText = text.toLowerCase();
  return lowerText.includes('recurring') || 
         lowerText.includes('lifetime') || 
         lowerText.includes('monthly') ||
         lowerText.includes('subscription');
}
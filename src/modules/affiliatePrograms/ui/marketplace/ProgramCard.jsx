import React, { useState } from 'react';
import CommissionBadge from './CommissionBadge';
import { formatDate } from '@/shared/utils/dateUtils';

export default function ProgramCard({ program }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Extract commission percentage if available
  const commissionPercentage = extractCommissionPercentage(program.commissionStructure);
  
  // Determine if it's a recurring commission
  const isRecurring = isRecurringCommission(program.commissionStructure);
  
  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden flex flex-col hover:shadow-lg transition-shadow border border-secondary-100">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-semibold text-secondary-900">{program.appName}</h2>
          <CommissionBadge percentage={commissionPercentage} isRecurring={isRecurring} />
        </div>
        
        <p className={`text-secondary-600 mb-4 ${isExpanded ? '' : 'line-clamp-3'}`}>
          {program.appDescription}
        </p>
        
        {program.appDescription.length > 150 && (
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
              {program.commissionStructure}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-secondary-800 mb-1 text-sm">Payment Terms</h3>
            <p className="text-secondary-600 text-sm bg-secondary-50 p-2 rounded-md">
              {program.paymentTerms}
            </p>
          </div>
        </div>
        
        <div className="text-xs text-secondary-500 mt-2">
          Listed on {formatDate(program.createdAt)}
        </div>
      </div>
      
      <div className="p-4 bg-secondary-50 mt-auto border-t border-secondary-100">
        <div className="flex flex-col sm:flex-row gap-3">
          <a 
            href={program.appUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-secondary-100 text-secondary-800 px-4 py-2 rounded-md text-sm text-center border border-secondary-200 transition-colors cursor-pointer flex-1 flex items-center justify-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Visit App</span>
          </a>
          <a 
            href={program.affiliateSignupUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm text-center transition-colors cursor-pointer flex-1 flex items-center justify-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Join Program</span>
          </a>
        </div>
      </div>
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
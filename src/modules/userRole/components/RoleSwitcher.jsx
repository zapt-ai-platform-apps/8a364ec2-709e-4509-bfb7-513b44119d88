import React from 'react';
import { useUserRole, ROLES } from '../context';

const RoleSwitcher = () => {
  const { userRole, toggleRole } = useUserRole();

  return (
    <div className="bg-gray-100 rounded-full p-1 flex items-center shadow-sm">
      <button 
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
          userRole === ROLES.AFFILIATE 
            ? 'bg-white text-primary-700 shadow-sm' 
            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
        } cursor-pointer flex items-center gap-1.5`}
        onClick={() => userRole !== ROLES.AFFILIATE && toggleRole()}
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Affiliate
      </button>
      <button 
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
          userRole === ROLES.CREATOR 
            ? 'bg-white text-primary-700 shadow-sm' 
            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
        } cursor-pointer flex items-center gap-1.5`}
        onClick={() => userRole !== ROLES.CREATOR && toggleRole()}
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        Creator
      </button>
    </div>
  );
};

export default RoleSwitcher;
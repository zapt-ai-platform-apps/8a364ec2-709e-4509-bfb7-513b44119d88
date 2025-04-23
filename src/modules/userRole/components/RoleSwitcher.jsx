import React from 'react';
import { useUserRole, ROLES } from '../context';

const RoleSwitcher = () => {
  const { userRole, toggleRole } = useUserRole();

  return (
    <div className="bg-gray-100 rounded-lg p-1 flex items-center shadow-sm">
      <button 
        className={`px-4 py-1.5 rounded text-sm font-medium transition-all duration-200 ${
          userRole === ROLES.AFFILIATE 
            ? 'bg-white shadow-sm text-primary-700' 
            : 'text-gray-600 hover:text-gray-800'
        } cursor-pointer`}
        onClick={() => userRole !== ROLES.AFFILIATE && toggleRole()}
      >
        Affiliate
      </button>
      <button 
        className={`px-4 py-1.5 rounded text-sm font-medium transition-all duration-200 ${
          userRole === ROLES.CREATOR 
            ? 'bg-white shadow-sm text-primary-700' 
            : 'text-gray-600 hover:text-gray-800'
        } cursor-pointer`}
        onClick={() => userRole !== ROLES.CREATOR && toggleRole()}
      >
        Creator
      </button>
    </div>
  );
};

export default RoleSwitcher;
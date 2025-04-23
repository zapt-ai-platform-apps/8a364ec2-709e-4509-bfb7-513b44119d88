import React, { createContext, useState, useContext, useEffect } from 'react';

// Define role constants
export const ROLES = {
  AFFILIATE: 'affiliate',
  CREATOR: 'creator'
};

// Create context
const UserRoleContext = createContext(null);

export const UserRoleProvider = ({ children }) => {
  // Initialize from localStorage or default to AFFILIATE
  const [userRole, setUserRole] = useState(() => {
    const savedRole = localStorage.getItem('userRole');
    return savedRole || ROLES.AFFILIATE;
  });

  // Persist role changes to localStorage
  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  const toggleRole = () => {
    setUserRole(prevRole => 
      prevRole === ROLES.AFFILIATE ? ROLES.CREATOR : ROLES.AFFILIATE
    );
  };

  return (
    <UserRoleContext.Provider value={{ userRole, toggleRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

// Custom hook for consuming the context
export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';
import { RoleSwitcher, useUserRole, ROLES } from '@/modules/userRole';

export default function Header() {
  const { user, signOut } = useAuth();
  const { userRole } = useUserRole();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-button')) {
        setShowMobileMenu(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-white to-gray-50 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600 flex items-center gap-3 group">
            <div className="relative overflow-hidden rounded-lg transition-all duration-300 transform group-hover:scale-110">
              <img 
                src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=40&height=40" 
                alt="ZAPT Logo" 
                className="w-10 h-10"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400/30 to-accent-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
              ZAPT <span className="font-semibold">Affiliate</span>
            </span>
          </Link>

          {/* Role Switcher for signed in users */}
          {user && (
            <div className="hidden md:block">
              <RoleSwitcher />
            </div>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {(!user || userRole === ROLES.AFFILIATE) && (
              <Link 
                to="/marketplace" 
                className={`font-medium transition-all duration-300 border-b-2 py-1 ${
                  isActive('/marketplace') 
                    ? 'text-primary-700 border-primary-600' 
                    : 'text-secondary-700 border-transparent hover:text-primary-600 hover:border-primary-400'
                }`}
              >
                Browse Marketplace
              </Link>
            )}
            
            {user && userRole === ROLES.CREATOR && (
              <Link 
                to="/submit-app" 
                className={`font-medium transition-all duration-300 border-b-2 py-1 ${
                  isActive('/submit-app') 
                    ? 'text-primary-700 border-primary-600' 
                    : 'text-secondary-700 border-transparent hover:text-primary-600 hover:border-primary-400'
                }`}
              >
                Submit App
              </Link>
            )}
          </nav>

          {/* Account/Login */}
          <div className="flex items-center">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-secondary-700 hover:text-primary-600 transition-colors duration-300 cursor-pointer bg-white py-2 px-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md"
                >
                  <span className="font-medium">Account</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100 animate-fade-in-down">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-md">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                      <p className="text-xs text-gray-500 mt-1">Signed in</p>
                    </div>
                    
                    {userRole === ROLES.CREATOR && (
                      <Link
                        to="/my-apps"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200"
                        onClick={() => setShowDropdown(false)}
                      >
                        My Apps
                      </Link>
                    )}
                    
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-5 py-2 rounded-md shadow-sm hover:shadow-md font-medium cursor-pointer transition-all duration-300"
              >
                Sign In
              </Link>
            )}
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="ml-4 md:hidden text-gray-600 hover:text-primary-600 focus:outline-none mobile-menu-button transition-colors duration-300 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Role Switcher */}
        {user && showMobileMenu && (
          <div className="mt-4 md:hidden border-t border-gray-100 pt-4 pb-2">
            <div className="flex justify-center">
              <RoleSwitcher />
            </div>
          </div>
        )}
        
        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            showMobileMenu 
              ? 'max-h-64 opacity-100 border-t border-gray-100 pt-2' 
              : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col space-y-4 mt-2">
            {(!user || userRole === ROLES.AFFILIATE) && (
              <Link
                to="/marketplace"
                className={`text-secondary-700 hover:text-primary-600 font-medium px-2 py-1 ${
                  isActive('/marketplace') ? 'text-primary-700 bg-primary-50 rounded-md' : ''
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                Browse Marketplace
              </Link>
            )}
            
            {user && userRole === ROLES.CREATOR && (
              <>
                <Link
                  to="/submit-app"
                  className={`text-secondary-700 hover:text-primary-600 font-medium px-2 py-1 ${
                    isActive('/submit-app') ? 'text-primary-700 bg-primary-50 rounded-md' : ''
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  Submit App
                </Link>
                <Link
                  to="/my-apps"
                  className={`text-secondary-700 hover:text-primary-600 font-medium px-2 py-1 ${
                    isActive('/my-apps') ? 'text-primary-700 bg-primary-50 rounded-md' : ''
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  My Apps
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
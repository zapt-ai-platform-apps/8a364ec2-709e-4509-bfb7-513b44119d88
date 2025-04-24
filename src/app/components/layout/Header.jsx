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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center gap-3 group transition-all duration-300">
            <div className="relative rounded-lg p-1 bg-gradient-to-br from-primary-100 to-accent-100 shadow-sm">
              <img 
                src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=36&height=36" 
                alt="ZAPT Logo" 
                className="w-9 h-9 transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-accent-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-primary-700 font-bold leading-tight">ZAPT</span>
              <span className="text-sm text-gray-600 font-medium leading-tight -mt-1">Affiliate Marketplace</span>
            </div>
          </Link>

          {/* Central Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="bg-gray-100 rounded-full py-1 px-1 shadow-inner flex gap-1">
              {(!user || userRole === ROLES.AFFILIATE) && (
                <Link 
                  to="/marketplace" 
                  className={`relative px-5 py-1.5 rounded-full transition-all duration-200 text-sm font-medium ${
                    isActive('/marketplace') 
                      ? 'text-primary-700 bg-white shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Browse Marketplace
                  {isActive('/marketplace') && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"></span>
                  )}
                </Link>
              )}
              
              {user && userRole === ROLES.CREATOR && (
                <>
                  <Link 
                    to="/submit-app" 
                    className={`relative px-5 py-1.5 rounded-full transition-all duration-200 text-sm font-medium ${
                      isActive('/submit-app') 
                        ? 'text-primary-700 bg-white shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    Submit App
                    {isActive('/submit-app') && (
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"></span>
                    )}
                  </Link>
                  
                  <Link 
                    to="/my-apps" 
                    className={`relative px-5 py-1.5 rounded-full transition-all duration-200 text-sm font-medium ${
                      isActive('/my-apps') 
                        ? 'text-primary-700 bg-white shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    My Apps
                    {isActive('/my-apps') && (
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"></span>
                    )}
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Right Section: Role Switcher + Account */}
          <div className="flex items-center gap-4">
            {/* Role Switcher for signed in users */}
            {user && (
              <div className="hidden md:block">
                <RoleSwitcher />
              </div>
            )}

            {/* Account/Login */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors duration-200 cursor-pointer bg-white py-1.5 px-3 rounded-full border border-gray-200 hover:border-primary-200 hover:bg-primary-50"
                >
                  <div className="w-7 h-7 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">{user.email?.charAt(0).toUpperCase() || "U"}</span>
                  </div>
                  <span className="font-medium text-sm hidden lg:inline">Account</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100 animate-fade-in-down">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Signed in</p>
                    </div>
                    
                    {userRole === ROLES.CREATOR && (
                      <Link
                        to="/my-apps"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200"
                        onClick={() => setShowDropdown(false)}
                      >
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        My Apps
                      </Link>
                    )}
                    
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200 cursor-pointer"
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-full shadow-sm font-medium text-sm cursor-pointer transition-all duration-200 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Sign In</span>
              </Link>
            )}
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-gray-600 hover:text-primary-600 focus:outline-none mobile-menu-button transition-colors duration-200 cursor-pointer border border-gray-200 rounded-md p-1 hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            showMobileMenu 
              ? 'max-h-96 opacity-100 mt-3' 
              : 'max-h-0 opacity-0'
          }`}
        >
          {/* Mobile Role Switcher */}
          {user && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-2 font-medium">Switch role:</p>
              <RoleSwitcher />
            </div>
          )}
          
          <nav className="flex flex-col space-y-1 mt-3 bg-white rounded-lg overflow-hidden border border-gray-100">
            {(!user || userRole === ROLES.AFFILIATE) && (
              <Link
                to="/marketplace"
                className={`flex items-center gap-2 px-4 py-3 ${
                  isActive('/marketplace') 
                    ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' 
                    : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Browse Marketplace
              </Link>
            )}
            
            {user && userRole === ROLES.CREATOR && (
              <>
                <Link
                  to="/submit-app"
                  className={`flex items-center gap-2 px-4 py-3 ${
                    isActive('/submit-app') 
                      ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' 
                      : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Submit App
                </Link>
                <Link
                  to="/my-apps"
                  className={`flex items-center gap-2 px-4 py-3 ${
                    isActive('/my-apps') 
                      ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' 
                      : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  My Apps
                </Link>
              </>
            )}
            
            {user && (
              <button
                onClick={() => {
                  handleSignOut();
                  setShowMobileMenu(false);
                }}
                className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 border-l-4 border-transparent text-left"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
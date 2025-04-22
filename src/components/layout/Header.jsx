import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 mb-4 md:mb-0">ZAPT Affiliate Marketplace</Link>
        
        <nav className="flex flex-wrap items-center gap-4 md:gap-6">
          <Link to="/marketplace" className="text-gray-700 hover:text-blue-600">
            Marketplace
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <button 
                onClick={handleSignOut}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link 
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
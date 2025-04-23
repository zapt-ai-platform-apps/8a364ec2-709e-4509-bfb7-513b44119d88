import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';

export default function Footer() {
  const { user } = useAuth();
  
  // Check if user is an admin (has zapt.ai or mapt.events email)
  const isAdmin = user?.email && (user.email.endsWith('@zapt.ai') || user.email.endsWith('@mapt.events')) || false;

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">ZAPT Affiliate Marketplace</h3>
            <p className="text-gray-300">
              Connecting app creators with content creators and traditional marketers for mutually beneficial affiliate partnerships.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/marketplace" className="text-gray-300 hover:text-white">Marketplace</a></li>
              <li><a href="/login" className="text-gray-300 hover:text-white">Sign In</a></li>
              {isAdmin && (
                <li><Link to="/admin" className="text-gray-300 hover:text-white">Admin Portal</Link></li>
              )}
              {!isAdmin && user && (
                <li><a href="/login?return_to=%2Fadmin" className="text-gray-300 hover:text-white">Admin Portal</a></li>
              )}
              {!user && (
                <li><a href="/login?return_to=%2Fadmin" className="text-gray-300 hover:text-white">Admin Portal</a></li>
              )}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-300">
              Have questions about the marketplace? Feel free to reach out to us.
            </p>
            <a 
              href="mailto:support@zapt.ai" 
              className="inline-block mt-2 text-blue-400 hover:text-blue-300"
            >
              support@zapt.ai
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} ZAPT Affiliate Marketplace. All rights reserved.</p>
          <div className="mt-2">
            <a 
              href="https://www.zapt.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-gray-400 hover:text-white"
            >
              Made on ZAPT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
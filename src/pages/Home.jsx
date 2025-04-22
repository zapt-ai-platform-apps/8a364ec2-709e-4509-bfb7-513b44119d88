import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ZAPT Affiliate Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting innovative app creators with content creators seeking quality affiliate opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">App Creators</h2>
            <p className="text-gray-600 mb-6">
              Register and submit your app's affiliate program for review. Connect with content creators 
              and grow your user base through quality partnerships.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600">✓</span>
                </span>
                <span className="text-gray-600">Submit your app for review</span>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600">✓</span>
                </span>
                <span className="text-gray-600">Showcase your affiliate program</span>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600">✓</span>
                </span>
                <span className="text-gray-600">Connect with motivated content creators</span>
              </div>
            </div>
            <Link 
              to="/login" 
              className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-sm font-medium cursor-pointer"
            >
              Register Now
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Creators</h2>
            <p className="text-gray-600 mb-6">
              Browse our curated marketplace of quality affiliate programs. Find opportunities with 
              fair commission structures, focusing on recurring income potential.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-600">✓</span>
                </span>
                <span className="text-gray-600">No registration required</span>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-600">✓</span>
                </span>
                <span className="text-gray-600">Access verified affiliate opportunities</span>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-600">✓</span>
                </span>
                <span className="text-gray-600">Focus on quality, recurring income opportunities</span>
              </div>
            </div>
            <Link 
              to="/marketplace" 
              className="mt-8 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow-sm font-medium cursor-pointer"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Submit Your App</h3>
              <p className="text-gray-600">App creators register and submit their affiliate program details for review.</p>
            </div>
            
            <div className="p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">We Review</h3>
              <p className="text-gray-600">Our team verifies the program quality, ensuring fair terms and legitimate opportunities.</p>
            </div>
            
            <div className="p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">Approved programs appear in our marketplace, connecting you with content creators.</p>
            </div>
          </div>
        </div>
        
        {/* Discreet admin portal link */}
        <div className="mt-16 text-center">
          <div className="text-xs text-gray-400">
            <Link to="/admin" className="hover:underline">Admin</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
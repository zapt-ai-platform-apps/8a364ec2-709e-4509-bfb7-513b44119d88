import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/supabaseClient';
import Layout from '@/components/layout/Layout';

export default function Login() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-md mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Sign in with ZAPT</h1>
        <p className="text-center mb-8 text-gray-600">
          <a 
            href="https://www.zapt.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            ZAPT
          </a> provides secure authentication for this marketplace.
        </p>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#3b82f6',
                    brandAccent: '#2563eb',
                  },
                },
              },
            }}
            providers={['google', 'facebook', 'apple']}
            magicLink={true}
            view="magic_link"
            redirectTo={window.location.origin + '/dashboard'}
          />
        </div>
      </div>
    </Layout>
  );
}
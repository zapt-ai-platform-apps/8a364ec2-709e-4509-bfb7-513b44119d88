import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/shared/services/supabase';
import Layout from '@/app/components/layout/Layout';
import { useAuth } from '@/shared/hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  
  // Extract return_to parameter from URL if present
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get('return_to') || '/dashboard';
  
  // Redirect already logged in users
  useEffect(() => {
    if (!loading && user) {
      navigate(returnTo, { replace: true });
    }
  }, [user, loading, navigate, returnTo]);

  return (
    <Layout>
      <div className="py-16 bg-secondary-50">
        <div className="max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <img 
              src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=80&height=80" 
              alt="ZAPT Logo" 
              className="mx-auto w-16 h-16 mb-4"
            />
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">Sign in with ZAPT</h1>
            <p className="text-secondary-600">
              <a 
                href="https://www.zapt.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                ZAPT
              </a> provides secure authentication for this marketplace.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-soft">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#4f46e5',
                      brandAccent: '#4338ca',
                      inputText: '#1e293b',
                      inputBackground: '#f8fafc',
                      inputBorder: '#cbd5e1',
                      inputBorderHover: '#94a3b8',
                      inputBorderFocus: '#4f46e5',
                      inputPlaceholder: '#64748b',
                    },
                    space: {
                      buttonPadding: '12px 15px',
                      inputPadding: '12px 15px',
                    },
                    radii: {
                      borderRadiusButton: '8px',
                      buttonBorderRadius: '8px',
                      inputBorderRadius: '8px',
                    },
                    fonts: {
                      bodyFontFamily: `'Inter', sans-serif`,
                      buttonFontFamily: `'Inter', sans-serif`,
                      inputFontFamily: `'Inter', sans-serif`,
                    },
                  },
                },
                style: {
                  button: { 
                    fontWeight: '600',
                    borderRadius: '8px',
                    transition: 'all 150ms ease',
                  },
                  anchor: { 
                    color: '#4f46e5',
                    fontWeight: '500',
                    transition: 'color 150ms ease',
                  },
                  input: { 
                    borderRadius: '8px',
                    transition: 'all 150ms ease',
                  },
                },
              }}
              providers={['google', 'facebook', 'apple']}
              magicLink={true}
              view="magic_link"
              redirectTo={window.location.origin + returnTo}
            />
          </div>
          
          <div className="mt-8 text-center text-sm text-secondary-500">
            By signing in, you agree to our{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700 transition-colors">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
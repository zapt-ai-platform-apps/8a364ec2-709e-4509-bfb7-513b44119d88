import React, { useState, useEffect, useMemo } from 'react';
import * as Sentry from "@sentry/browser";
import { Navigate } from 'react-router-dom';
import Layout from '@/app/components/layout/Layout';
import { MarketplaceHero, NoApps, AppCard, AppFilters } from '@/modules/affiliatePrograms/ui';
import { LoadingSpinner, ErrorAlert } from '@/shared/components/ui';
import { useAuth } from '@/shared/hooks/useAuth';
import { supabase } from '@/shared/services/supabase';
import { useUserRole, ROLES } from '@/modules/userRole';

export default function Marketplace() {
  const { user, loading: authLoading } = useAuth();
  const { userRole } = useUserRole();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({
    recurring: false,
    highCommission: false,
    onlyFavorites: false,
  });

  // Redirect to submit-app if in creator mode
  useEffect(() => {
    if (user && userRole === ROLES.CREATOR && window.location.pathname === '/marketplace') {
      window.history.replaceState(null, '', '/submit-app');
      window.location.reload();
    }
  }, [user, userRole]);
  
  // Fetch apps
  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/api/getApps');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch apps');
        }
        
        setApps(data.apps);
        console.log('Fetched apps:', data.apps.length);
      } catch (error) {
        console.error('Error fetching apps:', error);
        Sentry.captureException(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApps();
  }, []);

  // Fetch user favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavorites([]);
        return;
      }
      
      try {
        setLoadingFavorites(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        const response = await fetch('/api/getFavorites', {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch favorites');
        }
        
        setFavorites(data.favorites);
        console.log('Fetched favorites:', data.favorites);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        Sentry.captureException(error);
      } finally {
        setLoadingFavorites(false);
      }
    };
    
    fetchFavorites();
  }, [user]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };
  
  const handleToggleFavorite = (appId, isFavorite) => {
    setFavorites(prev => 
      isFavorite 
        ? [...prev, appId] 
        : prev.filter(id => id !== appId)
    );
  };
  
  const filteredAndSortedApps = useMemo(() => {
    // First, filter the apps
    let result = apps.filter(app => {
      // Apply text search
      const matchesSearch = app.appName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.appDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.commissionStructure.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;
      
      // Apply other filters
      if (filters.recurring && !app.commissionStructure.toLowerCase().includes('recurring') && 
          !app.commissionStructure.toLowerCase().includes('lifetime')) {
        return false;
      }
      
      if (filters.highCommission && 
          !app.commissionStructure.match(/\b([3-9][0-9]|100)%\b/)) {
        return false;
      }
      
      // Only show favorites if the filter is active
      if (filters.onlyFavorites && user && !favorites.includes(app.id)) {
        return false;
      }
      
      return true;
    });
    
    // Then, sort the filtered results
    return result.sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'alphabetical':
          return a.appName.localeCompare(b.appName);
        default:
          return 0;
      }
    });
  }, [apps, searchTerm, filters, sortOption, favorites, user]);

  // If user is in creator mode, redirect to submit-app
  if (user && userRole === ROLES.CREATOR) {
    return <Navigate to="/submit-app" />;
  }
  
  return (
    <Layout>
      <MarketplaceHero 
        searchTerm={searchTerm} 
        onSearch={handleSearch}
        appCount={apps.length}
      />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          {error && <ErrorAlert message={error} />}
          
          {loading ? (
            <LoadingSpinner />
          ) : apps.length === 0 ? (
            <NoApps type="empty" onClearSearch={() => setSearchTerm('')} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <AppFilters 
                  filters={filters} 
                  onFilterChange={handleFilterChange}
                  sortOption={sortOption}
                  onSortChange={handleSortChange}
                  totalCount={apps.length}
                  filteredCount={filteredAndSortedApps.length}
                  showFavoritesFilter={!!user}
                  isLoadingUser={authLoading}
                />
              </div>
              
              <div className="lg:col-span-3">
                {filteredAndSortedApps.length === 0 ? (
                  <NoApps 
                    type="noMatches" 
                    onClearSearch={() => {
                      setSearchTerm('');
                      setFilters({
                        recurring: false,
                        highCommission: false,
                        onlyFavorites: false,
                      });
                    }} 
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {loadingFavorites && user ? (
                      <div className="col-span-full flex justify-center py-8">
                        <LoadingSpinner size="small" />
                      </div>
                    ) : (
                      filteredAndSortedApps.map((app) => (
                        <AppCard 
                          key={app.id} 
                          app={app} 
                          user={user}
                          favorites={favorites}
                          onToggleFavorite={handleToggleFavorite}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
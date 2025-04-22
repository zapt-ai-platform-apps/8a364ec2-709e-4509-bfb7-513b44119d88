import React, { useState, useEffect, useMemo } from 'react';
import * as Sentry from "@sentry/browser";
import Layout from '@/app/components/layout/Layout';
import { MarketplaceHero, NoPrograms, ProgramCard, ProgramFilters } from '@/modules/affiliatePrograms/ui';
import { LoadingSpinner, ErrorAlert } from '@/shared/components/ui';

export default function Marketplace() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [filters, setFilters] = useState({
    recurring: false,
    highCommission: false,
  });
  
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/api/getPrograms');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch programs');
        }
        
        setPrograms(data.programs);
        console.log('Fetched programs:', data.programs.length);
      } catch (error) {
        console.error('Error fetching programs:', error);
        Sentry.captureException(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPrograms();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };
  
  const filteredAndSortedPrograms = useMemo(() => {
    // First, filter the programs
    let result = programs.filter(program => {
      // Apply text search
      const matchesSearch = program.appName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.appDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.commissionStructure.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;
      
      // Apply other filters
      if (filters.recurring && !program.commissionStructure.toLowerCase().includes('recurring') && 
          !program.commissionStructure.toLowerCase().includes('lifetime')) {
        return false;
      }
      
      if (filters.highCommission && 
          !program.commissionStructure.match(/\b([3-9][0-9]|100)%\b/)) {
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
  }, [programs, searchTerm, filters, sortOption]);
  
  return (
    <Layout>
      <MarketplaceHero 
        searchTerm={searchTerm} 
        onSearch={handleSearch}
        programCount={programs.length}
      />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          {error && <ErrorAlert message={error} />}
          
          {loading ? (
            <LoadingSpinner />
          ) : programs.length === 0 ? (
            <NoPrograms type="empty" onClearSearch={() => setSearchTerm('')} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <ProgramFilters 
                  filters={filters} 
                  onFilterChange={handleFilterChange}
                  sortOption={sortOption}
                  onSortChange={handleSortChange}
                  totalCount={programs.length}
                  filteredCount={filteredAndSortedPrograms.length}
                />
              </div>
              
              <div className="lg:col-span-3">
                {filteredAndSortedPrograms.length === 0 ? (
                  <NoPrograms 
                    type="noMatches" 
                    onClearSearch={() => {
                      setSearchTerm('');
                      setFilters({
                        recurring: false,
                        highCommission: false,
                      });
                    }} 
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredAndSortedPrograms.map((program) => (
                      <ProgramCard key={program.id} program={program} />
                    ))}
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
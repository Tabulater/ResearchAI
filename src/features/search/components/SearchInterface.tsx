import React from 'react';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { realApiService } from '../../lib/api/realApiService';

interface SearchInterfaceProps {
  onResults: (results: any[]) => void;
}

export const SearchInterface: React.FC<SearchInterfaceProps> = ({ onResults }) => {
  const [query, setQuery] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [searchProgress, setSearchProgress] = React.useState(0);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setError(null);
    setSearchProgress(0);
    
    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setSearchProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90; // Don't go to 100% until the actual search completes
        }
        return prev + 10;
      });
    }, 300);

    try {
      const results = await realApiService.searchArxivPapers(query, 20);
      clearInterval(progressInterval);
      setSearchProgress(100);
      
      // Small delay to show 100% before hiding the progress
      await new Promise(resolve => setTimeout(resolve, 300));
      
      onResults(results);
    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
      setTimeout(() => setSearchProgress(0), 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Progress Bar */}
      {isSearching && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${searchProgress}%` }}
          ></div>
        </div>
      )}
      
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search research papers..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              disabled={isSearching}
            />
          </div>
        </div>
        
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
            isSearching 
              ? 'bg-blue-700 text-white' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSearching ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Searching {searchProgress}%</span>
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              <span>Search</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="text-red-700">{error}</span>
        </div>
      )}
    </div>
  );
};

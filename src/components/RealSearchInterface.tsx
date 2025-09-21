import React, { useState } from 'react';
import { Search, Loader2, AlertCircle, CheckCircle, Database } from 'lucide-react';
import { realApiService } from '../services/realApiService';

interface RealSearchInterfaceProps {
  onResults: (results: any[]) => void;
}

export const RealSearchInterface: React.FC<RealSearchInterfaceProps> = ({ onResults }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchSource, setSearchSource] = useState<'arxiv' | 'semantic' | 'crossref'>('arxiv');
  const [error, setError] = useState<string | null>(null);
  const [lastSearchInfo, setLastSearchInfo] = useState<string | null>(null);
  const [searchProgress, setSearchProgress] = useState<number>(0);

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
    setLastSearchInfo(null);

    try {
      let results: any[] = [];
      
      switch (searchSource) {
        case 'arxiv':
          results = await realApiService.searchArxivPapers(query, 20);
          setLastSearchInfo(`Searched arXiv database for "${query}"`);
          break;
        case 'semantic':
          results = await realApiService.searchSemanticScholar(query, 20);
          setLastSearchInfo(`Searched Semantic Scholar for "${query}"`);
          clearInterval(progressInterval);
          setSearchProgress(100);
          
          // Small delay to show 100% before hiding the progress
          await new Promise(resolve => setTimeout(resolve, 300));
          
          setIsSearching(false);
          if (results && results.length) {
            onResults(results);
            setLastSearchInfo(`Found ${results.length} papers for "${query}"`);
          }
          
          // Reset progress after completion
          setTimeout(() => setSearchProgress(0), 500);
          break;
        case 'crossref':
          results = await realApiService.searchCrossRef(query, 20);
          setLastSearchInfo(`Searched CrossRef database for "${query}"`);
          break;
      }

      onResults(results);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const exampleQueries = [
    'perovskite solar cell stability',
    'metal organic framework CO2 capture',
    'quantum dot photovoltaics',
    'lithium ion battery cathode materials',
    'photocatalytic water splitting'
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Database className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">Real Research Database Search</h2>
      </div>

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
        
        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search real research papers..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <select
            value={searchSource}
            onChange={(e) => setSearchSource(e.target.value as any)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="arxiv">arXiv (Free)</option>
            <option value="semantic">Semantic Scholar</option>
            <option value="crossref">CrossRef</option>
          </select>
          
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
              isSearching 
                ? 'bg-blue-700 text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-transform`}
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

        {lastSearchInfo && (
          <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-700">{lastSearchInfo}</span>
          </div>
        )}

        <div className="space-y-2">
          <span className="text-sm text-gray-600">Try these example searches:</span>
          <div className="flex flex-wrap gap-2">
            {exampleQueries.map((example, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(example)}
                className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-900 mb-2">Database Information:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li><strong>arXiv:</strong> Free access to 2M+ preprints in physics, math, CS, and more</li>
            <li><strong>Semantic Scholar:</strong> 200M+ papers with AI-powered insights</li>
            <li><strong>CrossRef:</strong> 130M+ scholarly works with DOI metadata</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
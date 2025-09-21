import React, { useState, useEffect } from 'react';
import { Search, Loader2, BookOpen, Atom, TrendingUp } from 'lucide-react';
import { aiService, type PaperResult, type ResearchQuery } from '../services/aiService';

interface SearchInterfaceProps {
  onResults: (results: PaperResult[]) => void;
}

export const SearchInterface: React.FC<SearchInterfaceProps> = ({ onResults }) => {
  const [query, setQuery] = useState('');
  const [field, setField] = useState<ResearchQuery['field']>('general');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const searchSuggestions = {
    materials: ['perovskite stability', 'quantum dot synthesis', 'MOF characterization'],
    solar: ['tandem solar cells', 'perovskite efficiency', 'photovoltaic degradation'],
    'carbon-capture': ['CO2 adsorption', 'MOF selectivity', 'capture mechanisms'],
    general: ['sustainability materials', 'renewable energy', 'green chemistry']
  };

  useEffect(() => {
    setSuggestions(searchSuggestions[field]);
  }, [field]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await aiService.searchLiterature({
        query: query.trim(),
        field,
        limit: 20
      });
      onResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <BookOpen className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">AI Literature Search</h2>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for research papers, materials, or concepts..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <select
            value={field}
            onChange={(e) => setField(e.target.value as ResearchQuery['field'])}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="general">General</option>
            <option value="materials">Materials Science</option>
            <option value="solar">Solar Energy</option>
            <option value="carbon-capture">Carbon Capture</option>
          </select>
          
          <button
            onClick={handleSearch}
            disabled={isSearching || !query.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSearching ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
            <span>{isSearching ? 'Searching...' : 'Search'}</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Suggestions:</span>
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
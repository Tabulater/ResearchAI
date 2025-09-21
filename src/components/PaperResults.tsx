import React, { useState } from 'react';
import { BookOpen, ExternalLink, Users, Calendar, TrendingUp, Filter } from 'lucide-react';
import type { PaperResult } from '../services/aiService';

interface PaperResultsProps {
  papers: PaperResult[];
}

export const PaperResults: React.FC<PaperResultsProps> = ({ papers }) => {
  const [sortBy, setSortBy] = useState<'relevance' | 'citations' | 'year'>('relevance');
  const [filterYear, setFilterYear] = useState<string>('all');

  const sortedPapers = [...papers].sort((a, b) => {
    switch (sortBy) {
      case 'citations':
        return b.citations - a.citations;
      case 'year':
        return b.year - a.year;
      default:
        return b.relevanceScore - a.relevanceScore;
    }
  });

  const filteredPapers = sortedPapers.filter(paper => {
    if (filterYear === 'all') return true;
    return paper.year.toString() === filterYear;
  });

  const years = [...new Set(papers.map(p => p.year))].sort((a, b) => b - a);

  if (papers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center text-gray-500">
          <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>No papers found. Try a different search query.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">
            Research Papers ({filteredPapers.length})
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option value="relevance">Relevance</option>
              <option value="citations">Citations</option>
              <option value="year">Year</option>
            </select>
          </div>

          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="all">All Years</option>
            {years.map(year => (
              <option key={year} value={year.toString()}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredPapers.map((paper, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              {paper.url ? (
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:text-blue-800 text-lg leading-tight pr-4 hover:underline"
                >
                  {paper.title}
                </a>
              ) : (
                <h3 className="font-semibold text-gray-900 text-lg leading-tight pr-4">
                  {paper.title}
                </h3>
              )}
              <div className="flex items-center space-x-2 flex-shrink-0">
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {Math.round(paper.relevanceScore * 100)}% match
                </span>
                {paper.doi && (
                  <a
                    href={`https://doi.org/${paper.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{paper.authors.slice(0, 3).join(', ')}{paper.authors.length > 3 ? ' et al.' : ''}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{paper.year}</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" />
                <span>{paper.citations} citations</span>
              </div>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              {paper.abstract}
            </p>

            <div className="flex flex-wrap gap-2">
              {paper.keywords.map((keyword, kidx) => (
                <span
                  key={kidx}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
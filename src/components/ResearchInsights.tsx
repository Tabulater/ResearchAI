import React, { useState, useEffect } from 'react';
import { TrendingUp, Lightbulb, Users, Target } from 'lucide-react';
import { aiService } from '../services/aiService';
import type { PaperResult } from '../services/aiService';

interface ResearchInsightsProps {
  papers: PaperResult[];
}

export const ResearchInsights: React.FC<ResearchInsightsProps> = ({ papers }) => {
  const [insights, setInsights] = useState<string[]>([]);
  const [collaborations, setCollaborations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (papers.length > 0) {
      generateInsights();
    }
  }, [papers]);

  const generateInsights = async () => {
    setIsLoading(true);
    try {
      const [insightResults, collaborationResults] = await Promise.all([
        aiService.generateResearchInsights(papers),
        aiService.suggestCollaborations({ papers })
      ]);
      
      setInsights(insightResults);
      setCollaborations(collaborationResults);
    } catch (error) {
      console.error('Failed to generate insights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (papers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center text-gray-500">
          <Lightbulb className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>Search for papers to generate AI-powered insights</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="h-6 w-6 text-emerald-600" />
          <h2 className="text-xl font-bold text-gray-900">AI Research Insights</h2>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Analyzing research trends...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, idx) => (
              <div key={idx} className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-lg border border-emerald-100">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-800">{insight}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Users className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Collaboration Suggestions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collaborations.map((collab, idx) => (
            <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-blue-900">{collab.name}</h3>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {collab.matchScore}% match
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{collab.institution}</p>
              <p className="text-sm text-gray-700 mb-2">{collab.expertise}</p>
              <p className="text-xs text-gray-600">{collab.recentWork}</p>
              <button className="mt-3 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
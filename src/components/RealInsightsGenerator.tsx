import React, { useState, useEffect } from 'react';
import { Brain, Loader2, AlertCircle, Lightbulb } from 'lucide-react';
import { realApiService } from '../services/realApiService';

interface RealInsightsGeneratorProps {
  papers: any[];
}

export const RealInsightsGenerator: React.FC<RealInsightsGeneratorProps> = ({ papers }) => {
  const [insights, setInsights] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (papers.length > 0) {
      generateInsights();
    }
  }, [papers]);

  const generateInsights = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const generatedInsights = await realApiService.generateInsights(papers);
      setInsights(generatedInsights);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate insights');
    } finally {
      setIsGenerating(false);
    }
  };

  if (papers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center text-gray-500">
          <Brain className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>Search for papers to generate AI-powered insights</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Brain className="h-6 w-6 text-emerald-600" />
          <h2 className="text-xl font-bold text-gray-900">AI Research Insights</h2>
        </div>
        
        <button
          onClick={generateInsights}
          disabled={isGenerating}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center space-x-2"
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Brain className="h-4 w-4" />
          )}
          <span>{isGenerating ? 'Generating...' : 'Regenerate'}</span>
        </button>
      </div>

      {error && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="text-red-700">{error}</span>
          <div className="ml-auto">
            <button
              onClick={generateInsights}
              className="text-sm text-red-600 hover:text-red-800 underline"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {isGenerating ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-3"></div>
          <p className="text-gray-600">Analyzing {papers.length} papers with AI...</p>
          <p className="text-sm text-gray-500 mt-1">This may take a few moments</p>
        </div>
      ) : insights.length > 0 ? (
        <div className="space-y-4">
          {insights.map((insight, idx) => (
            <div key={idx} className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-lg border border-emerald-100">
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-800">{insight}</p>
              </div>
            </div>
          ))}
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
            <h3 className="font-medium text-blue-900 mb-2">Analysis Summary:</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• Analyzed {papers.length} research papers</p>
              <p>• Generated {insights.length} key insights</p>
              <p>• Powered by Groq (llama-3.1-70b-versatile)</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
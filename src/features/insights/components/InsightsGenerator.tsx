import React, { useState } from 'react';
import { Sparkles, Lightbulb, AlertCircle, Loader2 } from 'lucide-react';

interface Paper {
  id: string;
  title: string;
  summary?: string;
  // Add other paper properties as needed
}

interface InsightsGeneratorProps {
  papers: Paper[];
}

export const InsightsGenerator: React.FC<InsightsGeneratorProps> = ({ papers }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [insights, setInsights] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const generateInsights = async () => {
    if (papers.length === 0) {
      setError('No papers available for generating insights. Please perform a search first.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Simulate API call to generate insights
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock insights based on the papers
      const paperTitles = papers.slice(0, 3).map(p => p.title);
      const mockInsights = [
        "Recent research shows significant advancements in the field, with multiple papers focusing on novel approaches.",
        `Key papers like "${paperTitles[0] || 'Recent Study'}" demonstrate promising results.`,
        "There's a growing trend in applying machine learning techniques to solve traditional problems.",
        "Several studies highlight the importance of cross-disciplinary approaches in this domain."
      ];
      
      setInsights(mockInsights.join('\n\n'));
    } catch (err) {
      setError('Failed to generate insights. Please try again later.');
      console.error('Insights generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Sparkles className="h-6 w-6 text-yellow-500" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Research Insights Generator</h2>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Generate AI-powered insights based on your search results. The system will analyze the papers and provide 
            key findings, trends, and connections.
          </p>

          <div className="flex items-center space-x-4 pt-2">
            <button
              onClick={generateInsights}
              disabled={isGenerating || papers.length === 0}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                isGenerating || papers.length === 0
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } transition-colors`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Lightbulb className="h-4 w-4" />
                  <span>Generate Insights</span>
                </>
              )}
            </button>

            <span className="text-sm text-gray-500 dark:text-gray-400">
              {papers.length > 0 
                ? `Analyzing ${papers.length} papers`
                : 'No papers available. Please perform a search first.'}
            </span>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {insights && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="prose prose-blue dark:prose-invert max-w-none">
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Key Insights
                  </h3>
                  <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                    {insights}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          How It Works
        </h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <p>
            The Insights Generator uses natural language processing to analyze the content of research papers 
            from your search results. It identifies:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Key findings and contributions</li>
            <li>Common themes and trends</li>
            <li>Connections between different papers</li>
            <li>Potential gaps in the research</li>
          </ul>
          <p>
            These insights can help you quickly understand the current state of research in your area of interest.
          </p>
        </div>
      </div>
    </div>
  );
};

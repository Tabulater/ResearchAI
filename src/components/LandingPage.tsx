import React from 'react';
import { Atom, Search, MessageSquare, ArrowRight } from 'lucide-react';

type TabId = 'home' | 'search' | 'materials' | 'insights' | 'config' | 'chat';

interface LandingPageProps {
  onNavigate: (tab: TabId) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: <Search className="h-5 w-5 text-primary-500" />,
      title: "Advanced Search",
      description: "Find relevant papers with intelligent semantic search across multiple databases.",
      color: "primary"
    },
    {
      icon: <Atom className="h-5 w-5 text-secondary-500" />,
      title: "Material Analysis",
      description: "Predict properties and behaviors of novel materials with AI-powered models.",
      color: "secondary"
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-accent-500" />,
      title: "Research Assistant",
      description: "Get instant answers and insights about your research topics.",
      color: "accent"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
              Accelerate Your Research
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-100 max-w-3xl mx-auto">
              ResearchAI combines powerful AI with comprehensive scientific databases to help you discover, analyze, and understand research faster than ever.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <button 
                onClick={() => onNavigate('search')} 
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary-700 font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Search className="h-5 w-5" />
                Start Exploring
                <ArrowRight className="h-4 w-4" />
              </button>
              <button 
                onClick={() => onNavigate('chat')} 
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-200"
              >
                <MessageSquare className="h-5 w-5" />
                Try Research Chat
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700/50 hover:border-gray-200 dark:hover:border-gray-600 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className={`w-12 h-12 rounded-lg bg-${feature.color}-50 dark:bg-${feature.color}-900/20 flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800/50 dark:to-gray-800/30 rounded-2xl p-8 sm:p-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to accelerate your research?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of researchers using ResearchAI to streamline their workflow and make breakthrough discoveries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => onNavigate('materials')}
              className="px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Try Material Predictor
            </button>
            <button 
              onClick={() => onNavigate('insights')}
              className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Generate AI Insights
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

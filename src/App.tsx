import { useState } from 'react';
import { Atom, Database, Settings, Home } from 'lucide-react';
import { ThemeToggle } from './lib/components/ThemeToggle';
import { LandingPage } from './components/LandingPage';
import { SearchInterface } from './features/search';
import { MaterialPredictor } from './features/materials';
import { InsightsGenerator } from './features/insights';
import { ResearchChat } from './features/chat';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
  };
  
  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { id: 'search', label: 'Search Papers', icon: <Database className="h-5 w-5" /> },
    { id: 'materials', label: 'Materials', icon: <Atom className="h-5 w-5" /> },
    { id: 'chat', label: 'Research Chat', icon: <MessageSquare className="h-5 w-5" /> },
    { id: 'insights', label: 'Insights', icon: <Lightbulb className="h-5 w-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <LandingPage onNavigate={(tab) => setActiveTab(tab)} />;
      case 'search':
        return (
          <div className="space-y-6">
            <SearchInterface onResults={handleSearchResults} />
            {searchResults.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Search Results</h2>
                <PaperResults papers={searchResults} />
              </div>
            )}
          </div>
        );
      case 'materials':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg hidden md:block">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <Atom className="h-8 w-8 text-blue-600" />
                  <h1 className="text-xl font-bold">ResearchAI</h1>
                </div>
              </div>
              <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="px-4 sm:px-6 py-4 flex justify-between items-center">
                  <h1 className="text-xl font-semibold">
                    {navItems.find((item) => item.id === activeTab)?.label || 'ResearchAI'}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <ThemeToggle />
                  </div>
                </div>
              </header>
              <main className="flex-1 p-4 sm:p-6 overflow-auto">
                <div className="max-w-6xl mx-auto">
                  <MaterialPredictor />
                </div>
              </main>
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg hidden md:block">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <Atom className="h-8 w-8 text-blue-600" />
                  <h1 className="text-xl font-bold">ResearchAI</h1>
                </div>
              </div>
              <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="px-4 sm:px-6 py-4 flex justify-between items-center">
                  <h1 className="text-xl font-semibold">
                    {navItems.find((item) => item.id === activeTab)?.label || 'ResearchAI'}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <ThemeToggle />
                  </div>
                </div>
              </header>
              <main className="flex-1 p-4 sm:p-6 overflow-auto">
                <div className="max-w-6xl mx-auto">
                  <ResearchChat />
                </div>
              </main>
            </div>
          </div>
        );
      case 'insights':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg hidden md:block">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <Atom className="h-8 w-8 text-blue-600" />
                  <h1 className="text-xl font-bold">ResearchAI</h1>
                </div>
              </div>
              <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="px-4 sm:px-6 py-4 flex justify-between items-center">
                  <h1 className="text-xl font-semibold">
                    {navItems.find((item) => item.id === activeTab)?.label || 'ResearchAI'}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <ThemeToggle />
                  </div>
                </div>
              </header>
              <main className="flex-1 p-4 sm:p-6 overflow-auto">
                <div className="max-w-6xl mx-auto">
                  <InsightsGenerator papers={searchResults} />
                </div>
              </main>
            </div>
          </div>
        );
      case 'config':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="h-6 w-6 text-gray-600" />
              <h2 className="text-xl font-bold text-gray-900">API Configuration</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-yellow-900">API Keys Required</h3>
                    <p className="text-sm text-yellow-800 mt-1">
                      To use the full functionality, you need to configure API keys in the .env file:
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Groq API (Free - Required for AI Insights)</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Get your free API key from: <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://console.groq.com/keys</a>
                  </p>
                  <code className="text-xs bg-gray-100 p-2 rounded block">
                    VITE_GROQ_API_KEY=your_groq_api_key_here
                  </code>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Materials Project API (Optional - Enables real material properties)</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Get your API key from: <a href="https://materialsproject.org/open" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://materialsproject.org/open</a>
                  </p>
                  <code className="text-xs bg-gray-100 p-2 rounded block">
                    VITE_MATERIALS_PROJECT_API_KEY=your_materials_project_key_here
                  </code>
                  <p className="text-xs text-gray-500 mt-2">If not set, the Material Predictor will use a computational fallback with heuristics.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Semantic Scholar API (Optional)</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Get your API key from: <a href="https://www.semanticscholar.org/product/api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.semanticscholar.org/product/api</a>
                  </p>
                  <code className="text-xs bg-gray-100 p-2 rounded block">
                    VITE_SEMANTIC_SCHOLAR_API_KEY=your_semantic_scholar_key_here
                  </code>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">CrossRef API (Free)</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Just add your email for polite usage:
                  </p>
                  <code className="text-xs bg-gray-100 p-2 rounded block">
                    VITE_CROSSREF_EMAIL=your_email@example.com
                  </code>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-medium text-green-900 mb-2">What Works Without API Keys:</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• arXiv paper search (completely free)</li>
                  <li>• Basic material property prediction</li>
                  <li>• Paper result display and filtering</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-900 mb-2">What Requires API Keys:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• AI-powered research insights generation</li>
                  <li>• Semantic Scholar enhanced search</li>
                  <li>• Advanced material property predictions</li>
                </ul>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className="group flex items-center space-x-3 focus:outline-none"
              aria-label="Go to Home"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center group-hover:opacity-90 transition-all duration-200 shadow-md">
                <Atom className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  ResearchAI
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Search • Predict • Understand
                </p>
              </div>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg border border-green-100 dark:border-green-800/50">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-400">API Connected</span>
              </div>
              <button
                onClick={() => setActiveTab('home')}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow"
              >
                <Home className="h-4 w-4" />
                Home
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        <div className="animate-fadeIn">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 inset-x-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm">
            <div className="text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
              <span className="font-medium text-gray-700 dark:text-gray-300">ResearchAI</span> • v1.0.0
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 dark:text-gray-400">{searchResults.length} papers analyzed</span>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-gray-500 dark:text-gray-400">
                <span className="hidden sm:inline">Powered by </span>AI & Live Data
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
import React from 'react';
import { ExternalLink, FileText, Calendar, User } from 'lucide-react';

interface Paper {
  id: string;
  title: string;
  authors: string[];
  published: string;
  updated: string;
  summary: string;
  link: string;
  pdfLink?: string;
  categories?: string[];
}

interface PaperResultsProps {
  papers: Paper[];
}

export const PaperResults: React.FC<PaperResultsProps> = ({ papers }) => {
  if (papers.length === 0) return null;

  return (
    <div className="space-y-4">
      {papers.map((paper) => (
        <div 
          key={paper.id} 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {paper.title}
            </h3>
            <a 
              href={paper.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
            <User className="h-4 w-4 mr-1" />
            <span>{paper.authors?.join(', ') || 'Unknown authors'}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Published: {new Date(paper.published).toLocaleDateString()}</span>
            {paper.updated && (
              <span className="ml-2">
                (Updated: {new Date(paper.updated).toLocaleDateString()})
              </span>
            )}
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {paper.summary}
          </p>
          
          {paper.categories && paper.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {paper.categories.map((category, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
          
          <div className="mt-4 flex space-x-3">
            {paper.pdfLink && (
              <a
                href={paper.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FileText className="h-3 w-3 mr-1" />
                PDF
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

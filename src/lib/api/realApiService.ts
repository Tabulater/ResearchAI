import axios from 'axios';

// Base URL for arXiv API
const ARXIV_API_URL = 'http://export.arxiv.org/api/query';

// Types for API responses
interface Author {
  name: string;
}

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  published: string;
  updated: string;
  summary: string;
  link: string;
  pdfLink?: string;
  categories?: string[];
  doi?: string;
  comment?: string;
  journalRef?: string;
}

interface SearchResponse {
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  items: Paper[];
}

/**
 * Search for papers on arXiv
 * @param query Search query string
 * @param maxResults Maximum number of results to return (default: 10)
 * @returns Promise with search results
 */
export const searchArxivPapers = async (
  query: string,
  maxResults: number = 10
): Promise<Paper[]> => {
  try {
    const response = await axios.get(ARXIV_API_URL, {
      params: {
        search_query: query,
        max_results: maxResults,
        sortBy: 'submittedDate',
        sortOrder: 'descending',
      },
    });

    // Parse the XML response
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');
    
    // Extract entries
    const entries = Array.from(xmlDoc.getElementsByTagName('entry'));
    
    return entries.map((entry) => {
      const id = entry.getElementsByTagName('id')[0]?.textContent || '';
      const title = entry.getElementsByTagName('title')[0]?.textContent?.replace(/\s+/g, ' ').trim() || 'No title';
      const summary = entry.getElementsByTagName('summary')[0]?.textContent?.trim() || '';
      const published = entry.getElementsByTagName('published')[0]?.textContent || '';
      const updated = entry.getElementsByTagName('updated')[0]?.textContent || '';
      
      // Extract authors
      const authorElements = entry.getElementsByTagName('author');
      const authors = Array.from(authorElements).map(
        (author) => author.getElementsByTagName('name')[0]?.textContent || 'Unknown Author'
      );
      
      // Extract categories
      const categoryElements = entry.getElementsByTagName('category');
      const categories = Array.from(categoryElements).map(
        (cat) => cat.getAttribute('term') || ''
      ).filter(Boolean);
      
      // Find PDF link
      const links = entry.getElementsByTagName('link');
      let pdfLink = '';
      for (let i = 0; i < links.length; i++) {
        if (links[i].getAttribute('title') === 'pdf') {
          pdfLink = links[i].getAttribute('href') || '';
          break;
        }
      }
      
      // Find DOI if available
      let doi = '';
      const doiElements = Array.from(entry.getElementsByTagName('arxiv:doi'));
      if (doiElements.length > 0) {
        doi = doiElements[0].textContent || '';
      }
      
      // Find comment if available
      let comment = '';
      const commentElements = Array.from(entry.getElementsByTagName('arxiv:comment'));
      if (commentElements.length > 0) {
        comment = commentElements[0].textContent || '';
      }
      
      // Find journal reference if available
      let journalRef = '';
      const journalRefElements = Array.from(entry.getElementsByTagName('arxiv:journal_ref'));
      if (journalRefElements.length > 0) {
        journalRef = journalRefElements[0].textContent || '';
      }

      return {
        id,
        title,
        authors,
        published,
        updated,
        summary,
        link: `https://arxiv.org/abs/${id.split('/').pop()}`,
        pdfLink: pdfLink || `https://arxiv.org/pdf/${id.split('/').pop()}.pdf`,
        categories,
        doi,
        comment,
        journalRef,
      };
    });
  } catch (error) {
    console.error('Error searching arXiv:', error);
    throw new Error('Failed to search arXiv. Please try again later.');
  }
};

/**
 * Search for papers on Semantic Scholar
 * @param query Search query string
 * @param maxResults Maximum number of results to return (default: 10)
 * @returns Promise with search results
 */
export const searchSemanticScholar = async (
  query: string,
  maxResults: number = 10
): Promise<Paper[]> => {
  try {
    // This is a placeholder implementation
    // In a real app, you would call the Semantic Scholar API
    console.log(`Searching Semantic Scholar for: ${query}`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    return [];
  } catch (error) {
    console.error('Error searching Semantic Scholar:', error);
    throw new Error('Failed to search Semantic Scholar. Please try again later.');
  }
};

/**
 * Search for papers on CrossRef
 * @param query Search query string
 * @param maxResults Maximum number of results to return (default: 10)
 * @returns Promise with search results
 */
export const searchCrossRef = async (
  query: string,
  maxResults: number = 10
): Promise<Paper[]> => {
  try {
    // This is a placeholder implementation
    // In a real app, you would call the CrossRef API
    console.log(`Searching CrossRef for: ${query}`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    return [];
  } catch (error) {
    console.error('Error searching CrossRef:', error);
    throw new Error('Failed to search CrossRef. Please try again later.');
  }
};

// Export all functions as default object
export default {
  searchArxivPapers,
  searchSemanticScholar,
  searchCrossRef,
};

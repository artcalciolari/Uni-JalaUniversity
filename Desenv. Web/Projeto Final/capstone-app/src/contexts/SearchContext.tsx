import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useBooks } from '../services/api';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchBooks: (term: string) => void;
  hasSearched: boolean;
  isLoading: boolean;
  books: { key: string; title: string; authors?: { name: string }[]; cover_id: number }[];
}

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) 
{
  const { searchBooks, hasSearched, isLoading, books } = useBooks();
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, searchBooks, hasSearched, isLoading, books }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() 
{
  const context = useContext(SearchContext);

  if (!context) 
  {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  
  return context;
}
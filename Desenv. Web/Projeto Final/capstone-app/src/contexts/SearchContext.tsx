import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useBooks } from '../services/api';

/**
 * Representa um livro retornado pela API do Open Library
 * @category Types
 */
export interface Book {
  /** Chave única do livro na API */
  key: string;
  /** Título do livro */
  title: string;
  /** Lista de autores do livro */
  authors?: { name: string }[];
  /** ID da capa do livro */
  cover_id: number;
}

/**
 * Interface que define o formato do contexto de busca
 * @category Contexts
 */
export interface SearchContextType {
  /** Termo atual da busca inserido pelo usuário */
  searchTerm: string;
  /** Função para atualizar o termo de busca */
  setSearchTerm: (term: string) => void;
  /** Função para executar a busca na API do Open Library */
  searchBooks: (term: string) => void;
  /** Função para buscar livros por categoria */
  searchBooksByCategory: (category: string) => void;
  /** Categoria atualmente selecionada */
  currentCategory: string;
  /** Indica se uma busca foi realizada pelo usuário */
  hasSearched: boolean;
  /** Indica se está navegando por categoria */
  isBrowsingCategory: boolean;
  /** Indica se está carregando dados da API */
  isLoading: boolean;
  /** Lista de livros encontrados na busca */
  books: Book[];
  /** Termo da última busca executada */
  lastSearchTerm: string;
}

/**
 * Contexto para gerenciar estado global da busca.
 * Centraliza toda a lógica relacionada à busca de livros.
 * @category Contexts
 */
const SearchContext = createContext<SearchContextType | null>(null);

/**
 * Provider que envolve a aplicação e fornece o contexto de busca.
 * Deve ser colocado no topo da árvore de componentes para que
 * todos os componentes filhos tenham acesso ao estado da busca.
 * 
 * @param children - Componentes filhos que terão acesso ao contexto
 * @returns Provider do contexto de busca
 * 
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <SearchProvider>
 *       <HomePage />
 *       <BookDetailsPage />
 *     </SearchProvider>
 *   );
 * }
 * ```
 * 
 * @category Contexts
 */
export function SearchProvider({ children }: { children: ReactNode }) 
{
  const { books, isLoading, hasSearched, isBrowsingCategory, searchBooks, searchBooksByCategory, currentCategory, lastSearchTerm } = useBooks();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const value: SearchContextType = {
    searchTerm, 
    setSearchTerm, 
    searchBooks, 
    searchBooksByCategory, 
    currentCategory, 
    hasSearched, 
    isBrowsingCategory,
    isLoading, 
    books, 
    lastSearchTerm,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

/**
 * Hook personalizado para acessar o contexto de busca.
 * Deve ser usado apenas dentro de um componente envolvido pelo SearchProvider.
 * 
 * @throws {Error} Se usado fora do SearchProvider
 * @returns Objeto com estado e funções da busca
 * 
 * @example
 * ```tsx
 * function BookList() {
 *   const { searchTerm, setSearchTerm, searchBooks, books, isLoading } = useSearch();
 *   
 *   const handleSearch = () => {
 *     searchBooks(searchTerm);
 *   };
 *   
 *   return (
 *     <div>
 *       <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
 *       <button onClick={handleSearch}>Buscar</button>
 *       {isLoading ? <div>Carregando...</div> : books.map(book => <BookCard key={book.key} {...book} />)}
 *     </div>
 *   );
 * }
 * ```
 * 
 * @category Hooks
 */
export function useSearch() 
{
  const context = useContext(SearchContext);

  if (!context) 
  {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  
  return context;
}
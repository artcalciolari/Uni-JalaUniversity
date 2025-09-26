import { FiSearch } from 'react-icons/fi';
import styles from './SearchBar.module.css';

/**
 * Propriedades aceitas pelo componente SearchBar
 * @category Types
 */
export type SearchBarProps = {
  /** Termo de busca atual */
  searchTerm: string;
  /** Função para atualizar o termo de busca */
  setSearchTerm: (term: string) => void;
  /** Função para executar a busca com o termo fornecido */
  searchBooks: (term: string) => void;
  /** Classes CSS adicionais para personalização */
  className?: string;
};

/**
 * Componente de barra de busca centralizada para a HomePage.
 * Permite aos usuários pesquisar por livros de forma proeminente.
 * 
 * @param props - Propriedades do SearchBar
 * @returns Elemento JSX da barra de busca
 * 
 * @example
 * ```tsx
 * <SearchBar
 *   searchTerm={searchTerm}
 *   setSearchTerm={setSearchTerm}
 *   searchBooks={handleSearch}
 *   className="custom-search"
 * />
 * ```
 * 
 * @category Components
 */
export default function SearchBar({ searchTerm, setSearchTerm, searchBooks, className }: SearchBarProps) 
{
  /**
   * Manipula o envio do formulário de busca
   * @param e - Evento de submit do formulário
   */
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => 
  {
    e.preventDefault();
    if (searchTerm.trim()) 
    {
      searchBooks(searchTerm.trim());
    }
  };

  /**
   * Manipula mudanças no campo de busca
   * @param event - Evento de mudança do input
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => 
  {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={`${styles.searchContainer} ${className || ''}`}>
      <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
        <div className={styles.searchInputContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Busque por um livro..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
        <button type="submit" className={styles.searchButton}>
          Pesquisar
        </button>
      </form>
    </div>
  );
}
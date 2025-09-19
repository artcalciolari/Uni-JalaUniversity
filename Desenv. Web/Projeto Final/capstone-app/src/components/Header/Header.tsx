import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { FiSearch } from 'react-icons/fi';

/**
 * Propriedades aceitas pelo componente Header
 * @category Types
 */
export type HeaderProps = {
  /** Termo de busca atual */
  searchTerm: string | undefined;
  /** Função para atualizar o termo de busca */
  setSearchTerm: (term: string) => void;
  /** Função para executar a busca com o termo fornecido */
  searchBooks: (term: string) => void;
  /** Classes CSS adicionais para personalização */
  className?: string;
}

/**
 * Componente cabeçalho da aplicação BookFlow.
 * Contém logo, título, barra de pesquisa e botões de autenticação.
 * 
 * @param props - Propriedades do Header
 * @returns Elemento JSX do cabeçalho
 * 
 * @example
 * ```tsx
 * <Header
 *   searchTerm={searchTerm}
 *   setSearchTerm={setSearchTerm}
 *   searchBooks={handleSearch}
 *   className="custom-header"
 * />
 * ```
 * 
 * O Header é um componente fixo que aparece em todas as páginas e inclui:
 * - Logo e título da aplicação com link para home
 * - Campo de busca com ícone e botão de submit
 * - Botões de login e cadastro
 * 
 * @category Components
 */
function Header({ searchTerm, setSearchTerm, searchBooks, className }: HeaderProps) 
{
  /**
   * Manipula o envio do formulário de busca
   * @param e - Evento de submit do formulário
   */
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => 
  {
    e.preventDefault();
    searchBooks(searchTerm!);
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
    <header className={`${styles.header} ${className || ''}`}>
      {/* Logo Section */}
      <div className={styles.logoSection}>
        <Link to='/'>
          <img
            src='/new_logo.png'
            alt='BookFlow Logo'
          />
        </Link>
        <span className={styles.logoText}>BookFlow</span>
      </div>
        
      {/* Search Section */}
      <div className={styles.searchSection}>
        <form
          className={styles.SearchBar}
          onSubmit={handleSearchSubmit}
        >
          <FiSearch className={styles.searchIcon} />
          <input
            placeholder='Busque por um livro...'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit" className={styles.SearchBtn}>
            Pesquisar
          </button>
        </form>
      </div>

      {/* Actions Section */}
      <div className={styles.actionsSection}>
        <button className={styles.LoginBtn}>Entrar</button>
        <button className={styles.SignUpBtn}>Cadastrar</button>
      </div>
    </header>
  );
}

export default Header;
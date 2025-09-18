import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { FiSearch } from 'react-icons/fi';

type HeaderProps = {
  searchTerm: string | undefined;
  setSearchTerm: (term: string) => void;
  searchBooks: (term: string) => void;
  className?: string;
}

function Header({ searchTerm, setSearchTerm, searchBooks, className }: HeaderProps) 
{
  return (
    <header className={`${styles.header} ${className || ''}`}>
      {/* Logo Section */}
      <div className={styles.logoSection}>
        <Link to='/'>
          <img
            src='/bookflow-logo.svg'
            alt='BookFlow Logo'
          />
        </Link>
        <span className={styles.logoText}>BookFlow</span>
      </div>
        
      {/* Search Section */}
      <div className={styles.searchSection}>
        <form
          className={styles.SearchBar}
          onSubmit={e => 
          {
            e.preventDefault();
            searchBooks(searchTerm!);
          }}
        >
          <FiSearch className={styles.searchIcon} />
          <input
            placeholder='Busque por um livro...'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
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
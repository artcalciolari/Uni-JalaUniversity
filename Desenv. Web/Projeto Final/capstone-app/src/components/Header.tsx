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
    <div className={`${styles.header} ${className || ''}`}>
      <img
        src='/bookflow-logo.svg'
        alt='BookFlow Logo'
      />

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
          placeholder='Busque por um Livro!'
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button className={styles.SearchBtn}>Pesquisar</button>
      </form>

      <button className={styles.LoginBtn}>Login</button>
      <button className={styles.SignUpBtn}>Sign Up</button>
    </div>
  );
}

export default Header;
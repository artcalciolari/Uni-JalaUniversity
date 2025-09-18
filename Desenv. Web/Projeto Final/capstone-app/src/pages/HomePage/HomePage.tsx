import { useSearch } from '../../contexts/SearchContext';
import styles from './HomePage.module.css';
import BookCard from '../../components/BookCard/BookCard';
import Header from '../../components/Header/Header';

export function HomePage() 
{
  const { books, searchTerm, setSearchTerm, searchBooks, hasSearched, isLoading } = useSearch();

  return (
    <div className={styles.pageGrid}>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchBooks={searchBooks}
        className='header'
      />
      
      <main className={styles.body}>
        <div className={styles.mainTitle}>
          {hasSearched ? (
            <h1>Resultados da busca por '{searchTerm}'</h1>
          ) : (
            <>
              <h1>Procurando Por Um Livro?</h1>
              <h2>Nós Podemos Te Ajudar Com Isso!</h2>
              <h3>Esses são alguns dos livros mais famosos de ficção. Dê uma olhada!</h3>
            </>
          )}
        </div>

        <hr />

        <div className={styles.bookList}>
          {isLoading ? (
            <p>Carregando livros...</p>
          ) : (
            books.map((book) => (
              <BookCard
                key={book.key}
                id={book.key}
                title={book.title}
                author={book.authors && book.authors.length > 0 ? book.authors[0].name : 'Autor Desconhecido'}
                cover_id={book.cover_id}
              />
            ))
          )}
        </div>

      </main>

      {/* CRIAR COMPONENTE DO FOOTER */}
      <footer className='footer'>
        <p>&copy; 2025 Bookflow. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
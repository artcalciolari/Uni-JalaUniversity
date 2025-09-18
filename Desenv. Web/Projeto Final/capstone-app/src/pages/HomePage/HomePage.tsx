import { useSearch } from '../../contexts/SearchContext';
import styles from './HomePage.module.css';
import BookCard from '../../components/BookCard/BookCard';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { BookListSkeleton } from '../../components/Skeleton/Skeleton';

export function HomePage() 
{
  const { books, searchTerm, setSearchTerm, searchBooks, hasSearched, isLoading } = useSearch();

  return (
    <div className={styles.pageGrid}>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchBooks={searchBooks}
      />
      
      <main className={styles.body}>
        <section className={styles.mainTitle}>
          {hasSearched ? (
            <>
              <h1>Resultados da busca</h1>
              <h2>"{searchTerm}"</h2>
              <h3>Encontramos {books.length} livros para você</h3>
            </>
          ) : (
            <>
              <h1>Descubra Seu Próximo Livro</h1>
              <h2>Explore nossa coleção cuidadosamente selecionada</h2>
              <h3>Milhares de títulos esperando para serem descobertos por você</h3>
            </>
          )}
        </section>

        <hr className={styles.divider} />

        <section className={styles.bookList}>
          {isLoading ? (
            <BookListSkeleton count={12} />
          ) : books.length > 0 ? (
            books.map((book) => (
              <BookCard
                key={book.key}
                id={book.key}
                title={book.title}
                author={book.authors && book.authors.length > 0 ? book.authors[0].name : 'Autor Desconhecido'}
                cover_id={book.cover_id}
              />
            ))
          ) : hasSearched ? (
            <div className={styles.emptyState}>
              <h3 className={styles.emptyStateTitle}>Nenhum livro encontrado</h3>
              <p className={styles.emptyStateDescription}>
                Tente ajustar sua busca ou explore nossa coleção em destaque
              </p>
            </div>
          ) : null}
        </section>

      </main>

      <Footer />
    </div>
  );
}
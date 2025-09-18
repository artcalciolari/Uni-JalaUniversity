import { useSearch } from '../../contexts/SearchContext';
import { useBookDetails } from '../../services/api';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import BookCover from '../../components/BookDetails/BookCover/BookCover';
import BookInfo from '../../components/BookDetails/BookInfo/BookInfo';
import AuthorDetails from '../../components/AuthorDetails/AuthorDetails';
import Footer from '../../components/Footer/Footer';
import { BookDetailsSkeleton } from '../../components/Skeleton/Skeleton';
import styles from './BookDetails.module.css';

export function BookDetailsPage() 
{
  const { bKey } = useParams();
  const { searchTerm, setSearchTerm, searchBooks } = useSearch();
  const { bookDetails, isLoading } = useBookDetails(bKey || '');

  return (
    <div className={styles.pageGrid}>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchBooks={searchBooks}
      />

      <main className={styles.mainContent}>
        {isLoading ? (
          <BookDetailsSkeleton />
        ) : bookDetails ? (
          <div className={styles.bookDetails}>
            <BookCover
              coverId={bookDetails.coverId}
              title={bookDetails.title} />
            <BookInfo
              title={bookDetails.title}
              tags={bookDetails.tags}
              timeEra={bookDetails.timeEra}
              subjects={bookDetails.subjects}
              description={bookDetails.description}
              publishDate={bookDetails.publishDate}
              latestRevision={bookDetails.latestRevision}
              revision={bookDetails.revision}
              classifications={bookDetails.classifications}
            />
          </div>
        ) : (
          <h1>Detalhes do livro não encontrados.</h1>
        )}
      </main>

      {bookDetails && (
        <section className={styles.authorSection}>
          <h2 className={styles.authorTitle}>Sobre o Autor</h2>
          <AuthorDetails
            authorKey={bookDetails.authorKey}
          />
        </section>
      )}

      <Footer />
    </div>
  );

}
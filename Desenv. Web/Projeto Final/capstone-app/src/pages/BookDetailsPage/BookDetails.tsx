import { useSearch } from '../../contexts/SearchContext';
import { useBookDetails } from '../../services/api';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import BookCover from '../../components/BookDetails/BookCover/BookCover';
import BookInfo from '../../components/BookDetails/BookInfo/BookInfo';
import AuthorDetails from '../../components/AuthorDetails/AuthorDetails';
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
        className='header'
      />

      <main className={styles.mainContent}>
        {isLoading ? (
          <h1>Carregando Detalhes do Livro...</h1>
        ) :
          bookDetails ? (
            <div className={styles.bookDetails}> {/* GRID-AREA */}
              <BookCover
                className='cover'
                coverId={bookDetails.coverId}
                title={bookDetails.title}
              />
              <BookInfo
                className='info'
                title={bookDetails.title}
                tags={bookDetails.tags}
                timeEra={bookDetails.timeEra}
                description={bookDetails.description}
                publishDate={bookDetails.publishDate}
                latestRevision={bookDetails.latestRevision}
                revision={bookDetails.revision}
                classifications={bookDetails.classifications}
              />
              <AuthorDetails
                className='author'
                authorKey={bookDetails.authorKey}
              />
            </div>
          ): (
            <h1>Detalhes do livro não encontrados.</h1>
          )}
      </main>
    </div>
  );
}
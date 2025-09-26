import { useBookDetails } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BookDetailsSkeleton } from '../../components/Skeleton/Skeleton';
import { useLending } from '../../contexts/LoanContext';
import Header from '../../components/Header/Header';
import BookCover from '../../components/BookDetails/BookCover/BookCover';
import BookInfo from '../../components/BookDetails/BookInfo/BookInfo';
import AuthorDetails from '../../components/AuthorDetails/AuthorDetails';
import Footer from '../../components/Footer/Footer';
import styles from './BookDetails.module.css';
import { FaCheckCircle } from 'react-icons/fa';

/**
 * Página de detalhes de um livro específico.
 * Exibe informações completas incluindo capa, descrição, autor e detalhes técnicos.
 * 
 * @returns Elemento JSX da página de detalhes do livro
 * 
 * @example
 * ```tsx
 * // Rota: /book/:bKey
 * <BookDetailsPage />
 * ```
 * 
 * A BookDetailsPage apresenta informações detalhadas de um livro e inclui:
 * - Header com funcionalidade de busca mantida
 * - Layout em grid com capa do livro e informações
 * - Seção de detalhes do autor quando disponível
 * - Estados de loading com skeleton
 * - Footer com informações adicionais
 * 
 * Utiliza o parâmetro `bKey` da URL para buscar dados específicos do livro
 * através do hook `useBookDetails`.
 * 
 * @category Pages
 */
export function BookDetailsPage() 
{
  /** Parâmetro da URL contendo a chave do livro */
  const { bKey } = useParams();

  const { currentUser } = useAuth();

  const { addLoan, isBookLoaned } = useLending();
  
  /** Hook para buscar detalhes específicos do livro */
  const { bookDetails, isLoading } = useBookDetails(bKey || '');

  return (
    <div className={styles.pageContainer}>
      <Header />  {/* Remover as props searchTerm, setSearchTerm e searchBooks */}
      <main className={styles.mainContent}>
        {isLoading ? (
          <BookDetailsSkeleton />
        ) : bookDetails ? (
          <div className={styles.bookDetails}>
            <div className={styles.leftColumn}>
              <div className={styles.bookCoverContainer}>
                <BookCover
                  coverId={bookDetails.coverId}
                  title={bookDetails.title}
                />
              </div>
              <div className={styles.buttonContainer}>
                {isBookLoaned(bKey!) ? (
                  <>
                    <FaCheckCircle className={styles.iconReserved} />
                    <button className={styles.disabledBtn} disabled>Reservado</button>
                  </>
                ) : (currentUser ? (
                  <button
                    className={styles.reserveBtn}
                    onClick={() => addLoan(bKey!, bookDetails.title, bookDetails.coverId, currentUser.email)}
                  >Reservar</button>) : (null)
                )}
              </div>
            </div>
            <div className={styles.rightColumn}>
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
          </div>
        ) : (
          <h1>Detalhes do livro não encontrados.</h1>
        )}
      </main>

      {bookDetails && (
        <section className={styles.authorSection}>
          <h2 className={styles.authorTitle}>Sobre o Autor(a)</h2>
          <AuthorDetails
            authorKey={bookDetails.authorKey}
          />
        </section>
      )}

      <Footer />
    </div>
  );
}
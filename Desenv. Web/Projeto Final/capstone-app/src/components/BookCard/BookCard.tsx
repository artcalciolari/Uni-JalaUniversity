import { Link } from 'react-router-dom';
import styles from './BookCard.module.css';

/**
 * Propriedades aceitas pelo componente BookCard
 * @category Types
 */
export type BookCardProps = {
  /** ID único do livro usado para navegação (formato: "/works/OL12345W") */
  id: string;
  /** Título do livro exibido no card */
  title: string;
  /** Nome do autor principal */
  author: string;
  /** ID da capa do livro na API Open Library */
  cover_id: number;
};

/**
 * Componente que exibe um card com informações básicas de um livro.
 * Inclui navegação para página de detalhes ao clicar.
 * 
 * @param props - Propriedades do livro
 * @returns Elemento JSX do card do livro
 * 
 * @example
 * ```tsx
 * <BookCard
 *   id="/works/OL12345W"
 *   title="Dom Quixote"
 *   author="Miguel de Cervantes"
 *   cover_id={12345}
 * />
 * ```
 * 
 * @category Components
 */
function BookCard(props: BookCardProps) 
{
  /** Extrai apenas o ID numérico da chave do livro para navegação */
  const bookId = props.id.split('/').pop();

  return (
    <Link
      className={styles.linkStyle}
      to={`/book/${bookId}`}
    >
      <article className={styles.bookCard}>
        <div className={styles.cover}>
          <img
            src={`https://covers.openlibrary.org/b/id/${props.cover_id}-M.jpg`}
            alt={`Capa do livro ${props.title}`}
            loading="lazy"
          />
        </div>
        <div className={styles.bookInfo}>
          <h2>{props.title}</h2>
          <p>{props.author}</p>
          <div className={styles.readingIndicator}>
            <div className={styles.readingProgress} />
          </div>
        </div>
      </article>
    </Link>
  );
}

export default BookCard;
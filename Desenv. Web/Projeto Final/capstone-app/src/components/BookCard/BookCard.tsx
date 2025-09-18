import { Link } from 'react-router-dom';
import styles from './BookCard.module.css';

type BookCardProps = {
  id: string;
  title: string;
  author: string;
  cover_id: number;
};

function BookCard(props: BookCardProps) 
{
  const bookId = props.id.split('/').pop(); // Extrai o ID do livro

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
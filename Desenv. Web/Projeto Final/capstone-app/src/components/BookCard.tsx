import styles from './BookCard.module.css';

type BookCardProps = {
  title: string;
  author: string;
  cover_id: number;
};

function BookCard(props: BookCardProps) 
{
  return (
    <div className={styles.bookCard} >
      <div className={styles.cover}>
        <img
        src={`https://covers.openlibrary.org/b/id/${props.cover_id}-M.jpg`}
        alt={`Capa do livro ${props.title}`}
        />
      </div>
      <h2>{props.title}</h2>
      <p>{props.author}</p>
    </div>
  );
}

export default BookCard;
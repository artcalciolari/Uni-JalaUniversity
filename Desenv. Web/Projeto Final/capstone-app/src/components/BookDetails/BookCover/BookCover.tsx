import styles from './BookCover.module.css';

type BookCoverProps = {
  className: string;
  coverId: number;
  title: string;
};

function BookCover({ coverId, title }: BookCoverProps) 
{
  return (
    <div className={styles.cover}>
      <img
        src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
        alt={`Capa do livro ${title}`}
      />
      <button className={styles.reserveBtn}>Reservar</button>
    </div>
  );
}

export default BookCover;
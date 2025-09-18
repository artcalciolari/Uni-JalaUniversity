import styles from './BookInfo.module.css';

type BookInfoProps = {
  className: string;
  title: string;
  tags: string[];
  timeEra: string[];
  description: string;
  publishDate: string;
  latestRevision: number;
  revision: number;
  classifications: string[];
};

function BookInfo({ title, tags, timeEra, description, publishDate, latestRevision, revision, classifications }: BookInfoProps) 
{
  return (
    <div className={styles.info}>
      <div className={styles.title}>
        <h2>{title}</h2>
      </div>
      <div className={styles.tags}>
        <p>{tags.join(', ')}</p>  {/* Exibe tags como lista separada por vírgula */}
      </div>
      <div className={styles.timeEra}>
        <p>Se passa em: {timeEra.join(', ')}</p>
      </div>
      <hr />
      <div className={styles.description}>
        <p>{description}</p>
      </div>
      <hr />
      <div className={styles.publishedIn}>
        <p><strong>Publicado em:</strong> {publishDate}</p>
      </div>
      <div className={styles.latestRevision}>
        <p><strong>Última Revisão:</strong> {latestRevision}</p>
      </div>
      <div className={styles.revision}>
        <p><strong>Revisão:</strong> {revision}</p>
      </div>
      <div className={styles.classification}>
        <p>Classificação: {classifications.join(', ')}</p>
      </div>
    </div>
  );
}

export default BookInfo;
import { useAuthorDetails } from '../../services/api';
import styles from './AuthorDetails.module.css';

type AuthorDetailsProps = {
  className: string;
  authorKey?: string;
}

function AuthorDetails({ authorKey }: AuthorDetailsProps) 
{
  const { authorDetails, isLoadingAuthor } = useAuthorDetails(authorKey || '');

  return (
    <div className={styles.authorDetails}>
      {isLoadingAuthor ? (
        <p>Carregando detalhes do autor...</p>
      ) : authorDetails ? (
        <>
          <h1>Detalhes do Autor</h1>
          <div className={styles.authorPhoto}>
            <img
              src={`https://covers.openlibrary.org/b/id/${authorDetails.photoId}-M.jpg`}
              alt={`Foto de ${authorDetails.name}`}
            />    
          </div>
          <div className={styles.authorInfo}>
            <div className={styles.authorMinorInfo}>
              <h2>{authorDetails.name}</h2>
              <p><strong>Data de Nascimento:</strong> {authorDetails.birthDate}</p>
              <p><strong>Data de Falecimento:</strong> {authorDetails.deathDate}</p>
            </div>
            <div className={styles.authorBio}>
              <p>{authorDetails.bio}</p>
            </div>
          </div>
        </>
      ): (
        <p>Detalhes do autor não encontrados.</p>
      )}
    </div>
  );
}

export default AuthorDetails;
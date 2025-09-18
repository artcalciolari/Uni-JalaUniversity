import { useAuthorDetails } from '../../services/api';
import { AuthorDetailsSkeleton } from '../Skeleton/Skeleton';
import styles from './AuthorDetails.module.css';

type AuthorDetailsProps = {
  authorKey?: string;
}

function AuthorDetails({ authorKey }: AuthorDetailsProps) 
{
  const { authorDetails, isLoadingAuthor } = useAuthorDetails(authorKey || '');

  return (
    <div className={styles.authorDetails}>
      {isLoadingAuthor ? (
        <AuthorDetailsSkeleton />
      ) : authorDetails ? (
        <>
          <div className={styles.authorPhoto}>
            <img
              src={`https://covers.openlibrary.org/b/id/${authorDetails.photoId}-M.jpg`}
              alt={`Foto de ${authorDetails.name}`}
              onError={(e) => 
              {
                e.currentTarget.src = '/src/assets/jalaicon.png';
              }}
            />    
          </div>
          <div className={styles.authorInfo}>
            <div className={styles.authorMinorInfo}>
              <h2>{authorDetails.name}</h2>
              {authorDetails.birthDate && (
                <p><strong>Data de Nascimento:</strong> {authorDetails.birthDate}</p>
              )}
              {authorDetails.deathDate && (
                <p><strong>Data de Falecimento:</strong> {authorDetails.deathDate}</p>
              )}
            </div>
            {authorDetails.bio && (
              <div className={styles.authorBio}>
                <p>{authorDetails.bio}</p>
              </div>
            )}
          </div>
        </>
      ): (
        <p>Detalhes do autor não encontrados.</p>
      )}
    </div>
  );
}

export default AuthorDetails;
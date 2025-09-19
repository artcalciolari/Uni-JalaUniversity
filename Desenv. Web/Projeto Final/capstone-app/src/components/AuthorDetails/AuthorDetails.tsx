import { useAuthorDetails } from '../../services/api';
import { AuthorDetailsSkeleton } from '../Skeleton/Skeleton';
import styles from './AuthorDetails.module.css';

/**
 * Propriedades aceitas pelo componente AuthorDetails
 * @category Types
 */
export type AuthorDetailsProps = {
  /** Chave do autor na API Open Library (formato: "/authors/OL12345A") */
  authorKey?: string;
}

/**
 * Componente que exibe informações detalhadas de um autor.
 * Inclui foto, biografia, datas de nascimento e morte quando disponíveis.
 * 
 * @param props - Propriedades do autor
 * @returns Elemento JSX com detalhes do autor
 * 
 * @example
 * ```tsx
 * <AuthorDetails authorKey="/authors/OL12345A" />
 * ```
 * 
 * Busca e renderiza dados do autor usando a API Open Library:
 * - Foto do autor (com fallback para imagem padrão)
 * - Nome completo
 * - Datas de nascimento e morte
 * - Biografia completa
 * - Estados de loading e erro
 * 
 * @category Components
 */
function AuthorDetails({ authorKey }: AuthorDetailsProps) 
{
  /** Hook para buscar detalhes do autor */
  const { authorDetails, isLoadingAuthor } = useAuthorDetails(authorKey || '');

  /**
   * Manipula erro de carregamento da imagem do autor
   * @param e - Evento de erro da imagem
   */
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => 
  {
    e.currentTarget.src = '/src/assets/jalaicon.png';
  };

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
              onError={handleImageError}
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
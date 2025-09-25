import styles from './Skeleton.module.css';

/**
 * Componente skeleton que simula o layout de um card de livro durante o carregamento.
 * Exibe placeholders animados para capa, título e autor.
 * 
 * @returns Elemento JSX do skeleton de card de livro
 * 
 * @example
 * ```tsx
 * <BookCardSkeleton />
 * ```
 * 
 * @category Components
 */
export function BookCardSkeleton() 
{
  return (
    <div className={styles.bookCardSkeleton}>
      <div className={`${styles.skeleton} ${styles.bookCoverSkeleton}`} />
      <div className={`${styles.skeleton} ${styles.bookTitleSkeleton}`} />
      <div className={`${styles.skeleton} ${styles.bookAuthorSkeleton}`} />
    </div>
  );
}

/**
 * Componente que renderiza múltiplos skeletons de cards de livro.
 * Usado para simular uma lista de livros durante o carregamento.
 * 
 * @param count - Número de skeletons a serem renderizados (padrão: 12)
 * @returns Array de elementos JSX de skeletons de cards
 * 
 * @example
 * ```tsx
 * <BookListSkeleton count={8} />
 * ```
 * 
 * @category Components
 */
export function BookListSkeleton({ count = 12 }: { count?: number }) 
{
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </>
  );
}

/**
 * Componente skeleton que simula o layout da página de detalhes de um livro.
 * Exibe placeholders para capa, título, descrição e informações técnicas.
 * 
 * @returns Elemento JSX do skeleton de detalhes do livro
 * 
 * @example
 * ```tsx
 * <BookDetailsSkeleton />
 * ```
 * 
 * @category Components
 */
export function BookDetailsSkeleton() 
{
  return (
    <div className={styles.bookDetailsSkeleton}>
      <div className={styles.bookCoverDetailSkeleton}>
        <div className={`${styles.skeleton} ${styles.coverImage}`} />
        <div className={`${styles.skeleton} ${styles.reserveButton}`} />
      </div>
      <div className={styles.bookInfoSkeleton}>
        <div className={`${styles.skeleton} ${styles.bookTitleDetailSkeleton}`} />
        <div className={`${styles.skeleton} ${styles.bookTagsSkeleton}`} />
        <div className={`${styles.skeleton} ${styles.bookTimeEraSkeleton}`} />
        <div className={`${styles.skeleton} ${styles.bookSubjectsSkeleton}`} />
        <div className={`${styles.skeleton} ${styles.bookDescriptionSkeleton}`} />
        <div className={`${styles.skeleton} ${styles.bookMetaSkeleton}`} />
        <div className={`${styles.skeleton} ${styles.bookMetaSkeleton}`} />
        <div className={`${styles.skeleton} ${styles.bookMetaSkeleton}`} />
      </div>
    </div>
  );
}

/**
 * Componente skeleton que simula o layout da seção de detalhes do autor.
 * Exibe placeholders para foto, nome, datas e biografia do autor.
 * 
 * @returns Elemento JSX do skeleton de detalhes do autor
 * 
 * @example
 * ```tsx
 * <AuthorDetailsSkeleton />
 * ```
 * 
 * @category Components
 */
export function AuthorDetailsSkeleton() 
{
  return (
    <div className={styles.authorDetailsSkeleton}>
      <div className={styles.authorPhotoSkeleton}>
        <div className={`${styles.skeleton} ${styles.photoImage}`} />
      </div>
      <div className={styles.authorInfoSkeleton}>
        <div className={`${styles.skeleton} ${styles.authorNameSkeleton}`} />
        <div className={`${styles.skeleton} ${styles.authorDateSkeleton}`} />
        <div className={`${styles.skeleton} ${styles.authorDateSkeleton}`} />
        <div className={`${styles.skeleton} ${styles.authorBioSkeleton}`} />
      </div>
    </div>
  );
}
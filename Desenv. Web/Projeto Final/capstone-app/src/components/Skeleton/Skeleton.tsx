import styles from './Skeleton.module.css';

// Skeleton para um card de livro individual
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

// Skeleton para lista de livros (múltiplos cards) - SEM container próprio
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

// Skeleton para detalhes do livro
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

// Skeleton para detalhes do autor
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
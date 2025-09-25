import styles from './BookCover.module.css';

/**
 * Propriedades aceitas pelo componente BookCover
 * @category Types
 */
export type BookCoverProps = {
  /** ID da capa do livro na API Open Library */
  coverId: number;
  /** Título do livro para texto alternativo da imagem */
  title: string;
};

/**
 * Componente que exibe a capa de um livro em tamanho grande.
 * Inclui botão de reserva integrado.
 * 
 * @param props - Propriedades da capa do livro
 * @returns Elemento JSX da capa do livro
 * 
 * @example
 * ```tsx
 * <BookCover 
 *   coverId={12345} 
 *   title="Dom Quixote" 
 * />
 * ```
 * 
 * Renderiza uma capa de livro em alta resolução (tamanho L) usando a API
 * Open Library Covers. Inclui fallback de acessibilidade e botão de ação.
 * 
 * @category Components
 */
function BookCover({ coverId, title }: BookCoverProps) 
{  
  return (
    <div className={styles.cover}>
      <img
        src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
        alt={`Capa do livro ${title}`}
      />
    </div>
  );
}

export default BookCover;
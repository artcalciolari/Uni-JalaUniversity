import styles from './BookInfo.module.css';

/**
 * Propriedades aceitas pelo componente BookInfo
 * @category Types
 */
export type BookInfoProps = {
  /** Título do livro */
  title: string;
  /** Lista de tags/categorias do livro */
  tags: string[];
  /** Períodos históricos em que a história se passa */
  timeEra: string[];
  /** Temas ou personagens principais do livro */
  subjects: string[];
  /** Descrição ou sinopse do livro */
  description: string;
  /** Data de publicação */
  publishDate: string;
  /** Número da última revisão */
  latestRevision: number;
  /** Número da revisão atual */
  revision: number;
  /** Sistema de classificação bibliográfica */
  classifications: string[];
};

/**
 * Componente que exibe informações detalhadas de um livro.
 * Apresenta título, categorização, descrição e metadados de publicação.
 * 
 * @param props - Propriedades com informações do livro
 * @returns Elemento JSX com detalhes do livro
 * 
 * @example
 * ```tsx
 * <BookInfo
 *   title="Dom Quixote"
 *   tags={["Clássico", "Literatura Espanhola"]}
 *   timeEra={["Século XVII"]}
 *   subjects={["Dom Quixote", "Sancho Pança"]}
 *   description="Uma obra-prima da literatura mundial..."
 *   publishDate="1605"
 *   latestRevision={10}
 *   revision={8}
 *   classifications={["Ficção", "Romance"]}
 * />
 * ```
 * 
 * Organiza e apresenta metadados do livro em seções estruturadas:
 * - Título principal
 * - Categorização (tags, época, personagens)
 * - Descrição completa
 * - Informações de publicação e revisão
 * 
 * @category Components
 */
function BookInfo({ title, tags, timeEra, subjects, description, publishDate, latestRevision, revision, classifications }: BookInfoProps) 
{
  return (
    <div className={styles.info}>
      <div className={styles.title}>
        <h2>{title}</h2>
      </div>
      <div className={styles.tags}>
        <p>Tags: {tags.join(', ')}</p>  {/* Exibe tags como lista separada por vírgula */}
      </div>
      <div className={styles.timeEra}>
        <p>Se passa em: {timeEra.join(', ')}</p>
      </div>
      <div className={styles.subjects}>
        <p>Personagens: {subjects.join(', ')}</p>
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
import { useSearch } from '../../contexts/SearchContext';
import styles from './HomePage.module.css';
import BookCard from '../../components/BookCard/BookCard';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryCarousel from '../../components/CategoryCarousel/CategoryCarousel';
import { BookListSkeleton } from '../../components/Skeleton/Skeleton';

/**
 * Página inicial da aplicação BookFlow.
 * Exibe uma lista de livros populares e permite buscar por títulos específicos.
 * 
 * @returns Elemento JSX da página inicial
 * 
 * @example
 * ```tsx
 * <HomePage />
 * ```
 * 
 * A HomePage é a página principal da aplicação e inclui:
 * - Header com campo de busca integrado
 * - Seção hero com título e descrição dinâmicos
 * - Lista de livros em grid responsivo
 * - Estados de loading, erro e busca vazia
 * - Footer com informações adicionais
 * 
 * Utiliza o SearchContext para gerenciar estado global de busca,
 * permitindo navegação entre páginas mantendo resultados.
 * 
 * @category Pages
 */
/**
 * Mapeamento de categorias para nomes amigáveis
 */
const categoryNames: Record<string, string> = {
  fiction: 'Ficção',
  science_fiction: 'Ficção Científica',
  fantasy: 'Fantasia',
  mystery: 'Mistério',
  romance: 'Romance',
  horror: 'Terror',
  biography: 'Biografia',
  history: 'História',
  science: 'Ciência',
  philosophy: 'Filosofia',
  psychology: 'Psicologia',
  business: 'Negócios',
  self_help: 'Autoajuda',
  cooking: 'Culinária',
  art: 'Arte',
  music: 'Música',
  travel: 'Viagem',
  health: 'Saúde',
  sports: 'Esportes',
  technology: 'Tecnologia',
};

export function HomePage() 
{
  /** Contexto de busca com dados de livros e controles de pesquisa */
  const { books, searchTerm, setSearchTerm, searchBooks, searchBooksByCategory, currentCategory, hasSearched, isBrowsingCategory, isLoading, lastSearchTerm } = useSearch();

  return (
    <div className={styles.pageGrid}>
      <Header />
      
      <main className={styles.body}>
        <section className={styles.heroSection}>
          {hasSearched ? (
            <>
              <h1 className={styles.mainTitle}>Resultados da busca</h1>
              <h2 className={styles.subtitle}>"{lastSearchTerm}"</h2>
              <p className={styles.description}>Encontramos {books.length} livros para você</p>
            </>
          ) : isBrowsingCategory ? (
            <>
              <h1 className={styles.mainTitle}>Explorando {categoryNames[currentCategory] || currentCategory}</h1>
              <h2 className={styles.subtitle}>Descubra os melhores títulos desta categoria</h2>
              <p className={styles.description}>Encontramos {books.length} livros selecionados para você</p>
            </>
          ) : (
            <>
              <h1 className={styles.mainTitle}>Descubra Seu Próximo Livro</h1>
              <h2 className={styles.subtitle}>Explore nossa coleção cuidadosamente selecionada</h2>
              <p className={styles.description}>Milhares de títulos esperando para serem descobertos por você</p>
            </>
          )}
        </section>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchBooks={searchBooks}
        />

        <CategoryCarousel 
          onCategorySelect={searchBooksByCategory}
          selectedCategory={currentCategory}
        />

        <section className={styles.bookList}>
          {isLoading ? (
            <BookListSkeleton count={12} />
          ) : books.length > 0 ? (
            books.map((book) => (
              <BookCard
                key={book.key}
                id={book.key}
                title={book.title}
                author={book.authors && book.authors.length > 0 ? book.authors[0].name : 'Autor Desconhecido'}
                cover_id={book.cover_id}
              />
            ))
          ) : hasSearched ? (
            <div className={styles.emptyState}>
              <h3 className={styles.emptyStateTitle}>Nenhum livro encontrado</h3>
              <p className={styles.emptyStateDescription}>
                Tente ajustar sua busca ou explore nossa coleção em destaque
              </p>
            </div>
          ) : null}
        </section>

      </main>

      <Footer />
    </div>
  );
}
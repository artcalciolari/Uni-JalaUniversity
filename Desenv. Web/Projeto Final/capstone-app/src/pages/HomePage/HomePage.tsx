import { useSearch } from '../../contexts/SearchContext';
import styles from './HomePage.module.css';
import BookCard from '../../components/BookCard/BookCard';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
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
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchBooks={searchBooks}
      />
      
      <main className={styles.body}>
        <section className={styles.mainTitle}>
          {hasSearched ? (
            <>
              <h1>Resultados da busca</h1>
              <h2>"{lastSearchTerm}"</h2>  {/* Usar lastSearchTerm ao invés de searchTerm */}
              <h3>Encontramos {books.length} livros para você</h3>
            </>
          ) : isBrowsingCategory ? (
            <>
              <h1>Explorando {categoryNames[currentCategory] || currentCategory}</h1>
              <h2>Descubra os melhores títulos desta categoria</h2>
              <h3>Encontramos {books.length} livros selecionados para você</h3>
            </>
          ) : (
            <>
              <h1>Descubra Seu Próximo Livro</h1>
              <h2>Explore nossa coleção cuidadosamente selecionada</h2>
              <h3>Milhares de títulos esperando para serem descobertos por você</h3>
            </>
          )}
        </section>

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
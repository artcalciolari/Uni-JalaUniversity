import styles from './CategoryCarousel.module.css';

/**
 * Propriedades do componente CategoryCarousel
 * @category Components
 */
export interface CategoryCarouselProps {
  /** Função chamada quando uma categoria é selecionada */
  onCategorySelect: (category: string) => void;
  /** Categoria atualmente selecionada */
  selectedCategory?: string;
}

/**
 * Lista de categorias disponíveis na OpenLibrary API
 */
const categories = [
  { id: 'fiction', label: 'Ficção', subject: 'fiction' },
  { id: 'science_fiction', label: 'Ficção Científica', subject: 'science_fiction' },
  { id: 'fantasy', label: 'Fantasia', subject: 'fantasy' },
  { id: 'mystery', label: 'Mistério', subject: 'mystery' },
  { id: 'romance', label: 'Romance', subject: 'romance' },
  { id: 'horror', label: 'Terror', subject: 'horror' },
  { id: 'biography', label: 'Biografia', subject: 'biography' },
  { id: 'history', label: 'História', subject: 'history' },
  { id: 'science', label: 'Ciência', subject: 'science' },
  { id: 'philosophy', label: 'Filosofia', subject: 'philosophy' },
  { id: 'psychology', label: 'Psicologia', subject: 'psychology' },
  { id: 'business', label: 'Negócios', subject: 'business' },
  { id: 'self_help', label: 'Autoajuda', subject: 'self_help' },
  { id: 'cooking', label: 'Culinária', subject: 'cooking' },
  { id: 'art', label: 'Arte', subject: 'art' },
  { id: 'music', label: 'Música', subject: 'music' },
  { id: 'travel', label: 'Viagem', subject: 'travel' },
  { id: 'health', label: 'Saúde', subject: 'health' },
  { id: 'sports', label: 'Esportes', subject: 'sports' },
  { id: 'technology', label: 'Tecnologia', subject: 'technology' },
];

/**
 * Componente de carrossel de categorias para navegação por gêneros de livros.
 * Permite ao usuário navegar horizontalmente pelas categorias disponíveis
 * e selecionar uma para filtrar os livros exibidos.
 * 
 * @param props - Propriedades do componente
 * @returns Elemento JSX do carrossel de categorias
 * 
 * @example
 * ```tsx
 * <CategoryCarousel 
 *   onCategorySelect={(category) => searchBooksByCategory(category)}
 *   selectedCategory="fiction"
 * />
 * ```
 * 
 * @category Components
 */
export default function CategoryCarousel({ onCategorySelect, selectedCategory }: CategoryCarouselProps) 
{
  return (
    <section className={styles.carouselContainer}>
      <h3 className={styles.carouselTitle}>Ou explore por categoria</h3>
      <div className={styles.carousel}>
        <div className={styles.categoryList}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${
                selectedCategory === category.subject ? styles.selected : ''
              }`}
              onClick={() => onCategorySelect(category.subject)}
              type="button"
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
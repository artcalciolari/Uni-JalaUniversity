import { useState, useEffect } from 'react';

/**
 * Interface para a resposta da API inicial de livros.
 * Usada quando o programa inicia e carrega livros padrão.
 * @category Types
 */
interface ApiBookResponse {
  /** Chave única do livro na API */
  key: string;
  /** Título do livro */
  title: string;
  /** Lista de autores */
  authors?: { name: string }[];
  /** ID da capa do livro */
  cover_id: number;
}

/**
 * Interface para a resposta da API de busca.
 * Usada quando o usuário pesquisa por um livro específico.
 * @category Types
 */
interface SearchBookResponse {
  /** Chave única do livro na API */
  key: string;
  /** Título do livro */
  title: string;
  /** Array com nomes dos autores */
  author_name?: string[];
  /** ID da capa do livro (nome diferente na busca) */
  cover_i: number;
}

/**
 * Tipo normalizado de um livro.
 * Formato padrão usado em toda a aplicação.
 * @category Types
 */
export type Book = {
  /** Chave única do livro na API */
  key: string;
  /** Título do livro */
  title: string;
  /** Lista de autores */
  authors?: { name: string }[];
  /** ID da capa do livro */
  cover_id: number;
};

/**
 * Tipo detalhado de um livro com todas as informações.
 * Usado na página de detalhes do livro.
 * @category Types
 */
export type BookDetails = {
  /** Título do livro */
  title: string;
  /** Chave do autor principal */
  authorKey?: string;
  /** Descrição/sinopse do livro */
  description: string;
  /** Tags/assuntos do livro */
  tags: string[];
  /** ID da capa */
  coverId: number;
  /** Períodos históricos relacionados */
  timeEra: string[];
  /** Assuntos/temas abordados */
  subjects: string[];
  /** Data de primeira publicação */
  publishDate: string;
  /** Número da última revisão */
  latestRevision: number;
  /** Número da revisão atual */
  revision: number;
  /** Data de criação do registro */
  created: string;
  /** Classificações da biblioteca */
  classifications: string[];
}

/**
 * Tipo detalhado de um autor.
 * Contém informações biográficas completas.
 * @category Types
 */
export type AuthorDetails = {
  /** Nome completo do autor */
  name: string;
  /** Data de nascimento */
  birthDate: string;
  /** Data de falecimento */
  deathDate: string;
  /** Biografia do autor */
  bio: string;
  /** ID da foto do autor */
  photoId: number;
}


/**
 * Hook personalizado para gerenciar lista de livros e busca.
 * Carrega livros de ficção científica por padrão e permite busca personalizada.
 * 
 * @returns Objeto contendo lista de livros, estado de loading e função de busca
 * 
 * @example
 * ```tsx
 * function BookList() {
 *   const { books, isLoading, hasSearched, searchBooks } = useBooks();
 *   
 *   const handleSearch = (query: string) => {
 *     searchBooks(query);
 *   };
 *   
 *   if (isLoading) return <div>Carregando...</div>;
 *   
 *   return (
 *     <div>
 *       {books.map(book => <BookCard key={book.key} {...book} />)}
 *     </div>
 *   );
 * }
 * ```
 * 
 * @category Hooks
 */
export function useBooks() 
{
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => 
  {
    /**
     * Busca livros de ficção científica da API do Open Library.
     * Executado apenas uma vez na montagem do componente.
     */
    const fetchBooks = async() => 
    {
      try 
      {
        const response = await fetch('https://openlibrary.org/subjects/science_fiction.json?limit=20');
        const data = await response.json();

        const normalizedBooks = data.works.map((book: ApiBookResponse) => ({
          key: book.key,
          title: book.title,
          authors: book.authors,
          cover_id: book.cover_id,
        }));

        setBooks(normalizedBooks);
      }
      catch (error) 
      {
        console.error('Error fetching books:', error);
      }
      finally 
      {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  /**
   * Executa busca de livros baseada em query do usuário.
   * Substitui a lista atual de livros pelos resultados da busca.
   * 
   * @param query - Termo de busca inserido pelo usuário
   */
  const searchBooks = async(query: string) => 
  {
    try 
    {
      setIsLoading(true);
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      const data = await response.json();

      const normalizedBooks = data.docs.map((book: SearchBookResponse) => ({
        key: book.key,
        title: book.title,
        authors: book.author_name ? [{ name: book.author_name[0] }] : [],
        cover_id: book.cover_i,
      }));

      setBooks(normalizedBooks);
    }
    catch (error) 
    {
      console.error('Error querying books: ', error);
    }
    finally 
    {
      setIsLoading(false);
      setHasSearched(true);
    }

  };

  return { books, isLoading, hasSearched, searchBooks };
}

/**
 * Hook personalizado para obter detalhes de um livro específico.
 * Busca informações completas de um livro pela sua chave única.
 * 
 * @param bKey - Chave única do livro (ex: "OL12345W")
 * @returns Objeto contendo detalhes do livro e estado de loading
 * 
 * @example
 * ```tsx
 * function BookDetailsPage() {
 *   const { bKey } = useParams();
 *   const { bookDetails, isLoading } = useBookDetails(bKey);
 *   
 *   if (isLoading) return <div>Carregando detalhes...</div>;
 *   if (!bookDetails) return <div>Livro não encontrado</div>;
 *   
 *   return (
 *     <div>
 *       <h1>{bookDetails.title}</h1>
 *       <p>{bookDetails.description}</p>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @category Hooks
 */
export function useBookDetails(bKey: string) 
{
  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => 
  {
    if (!bKey) return;
    
    /**
     * Busca detalhes completos de um livro pela sua chave.
     * Processa e normaliza os dados da API para o formato esperado.
     */
    const fetchBookDetails = async() => 
    {
      try 
      {
        setIsLoading(true);
        const response = await fetch(`https://openlibrary.org/works/${bKey}.json`);
        const data = await response.json();

        const bookDetails: BookDetails = {
          title: data.title || 'Título Desconhecido',
          authorKey: data.authors[0].author.key || 'Autor Desconhecido',
          description: typeof data.description === 'string' ? data.description : (data.description?.value ?? 'Descrição não disponível'),
          tags: data.subjects.slice(0, 7) || ['N/A'],
          coverId: data.covers?.[0] || -1,
          timeEra: data.subject_times || ['N/A'],
          subjects: data.subject_people || ['N/A'],
          publishDate: data.first_publish_date || 'N/A',
          latestRevision: data.latest_revision || 'N/A',
          revision: data.revision || 'N/A',
          created: data.created.value || 'N/A',
          classifications: data.lc_classifications || ['N/A'],
        };

        setBookDetails(bookDetails);
      }
      catch (error) 
      {
        console.error('Error fetching book by key: ', error);
      }
      finally 
      {
        setIsLoading(false);
      };
    };

    fetchBookDetails();
  }, [bKey]);

  return { bookDetails, isLoading };
}

/**
 * Hook personalizado para obter detalhes de um autor específico.
 * Busca informações biográficas completas de um autor pela sua chave única.
 * 
 * @param authorKey - Chave única do autor (ex: "/authors/OL12345A")
 * @returns Objeto contendo detalhes do autor e estado de loading
 * 
 * @example
 * ```tsx
 * function AuthorBio() {
 *   const { authorDetails, isLoadingAuthor } = useAuthorDetails("/authors/OL12345A");
 *   
 *   if (isLoadingAuthor) return <div>Carregando autor...</div>;
 *   if (!authorDetails) return <div>Autor não encontrado</div>;
 *   
 *   return (
 *     <div>
 *       <h2>{authorDetails.name}</h2>
 *       <p>{authorDetails.birthDate} - {authorDetails.deathDate}</p>
 *       <p>{authorDetails.bio}</p>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @category Hooks
 */
export function useAuthorDetails(authorKey: string) 
{
  const [authorDetails, setAuthorDetails] = useState<AuthorDetails | null>(null);
  const [isLoadingAuthor, setIsLoadingAuthor] = useState(true);

  useEffect(() => 
  {
    if (!authorKey) return;

    /**
     * Busca detalhes biográficos de um autor pela sua chave.
     * Processa e normaliza os dados da API para o formato esperado.
     */
    const fetchAuthorDetails = async() => 
    {
      try
      {
        setIsLoadingAuthor(true);

        const response = await fetch(`https://openlibrary.org${authorKey}.json`);
        const data = await response.json();

        const authorDetails: AuthorDetails = {
          name: data.name || 'Nome Desconhecido',
          birthDate: data.birth_date || 'Data de nascimento não disponível',
          deathDate: data.death_date || 'Data de falecimento não disponível',
          bio: data.bio?.value || data.bio || 'Biografia não disponível',
          photoId: data.photos?.[0] || -1,
        };

        setAuthorDetails(authorDetails);
      }
      catch (error) 
      {
        console.error('Error fetching author by key: ', error);
      }
      finally
      {
        setIsLoadingAuthor(false);
      }
    };

    fetchAuthorDetails();
  }, [authorKey]);

  return { authorDetails, isLoadingAuthor };
}
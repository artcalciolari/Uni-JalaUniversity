import { useState, useEffect } from 'react';

// Interface para a resposta da API inicial,
// feita quando o programa inicia
interface ApiBookResponse {
  key: string;
  title: string;
  authors?: { name: string }[];
  cover_id: number;
}

// Interface para a resposta da API de busca,
// feita quando o usuário pesquisa por um livro
interface SearchBookResponse {
  key: string;
  title: string;
  author_name?: string[];
  cover_i: number;
}

// Tipo normalizado de um livro
type Book = {
  key: string;
  title: string;
  authors?: { name: string }[];
  cover_id: number;
};

// Tipo detalhado de um livro
type BookDetails = {
  title: string;
  authorKey?: string;
  description: string;
  tags: string[];
  coverId: number;
  timeEra: string[];
  subjects: string[];
  publishDate: string;
  latestRevision: number;
  revision: number;
  created: string;
  classifications: string[];
}

// Tipo detalhado de um autor
type AuthorDetails = {
  name: string;
  birthDate: string;
  deathDate: string;
  bio: string;
  photoId: number;
}


export function useBooks() 
{
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => 
  {
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
  }, []); // O array vazio faz com que o efeito seja executado apenas uma vez, após a montagem do componente

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

export function useBookDetails(bKey: string) 
{
  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => 
  {
    if (!bKey) return;
    
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
          description: data.description || data.description?.value ||'Descrição não disponível',
          tags: data.subjects.slice(0, 5) || [],
          coverId: data.covers?.[0] || -1,
          timeEra: data.subject_times || [],
          subjects: data.subject_people || [],
          publishDate: data.first_publish_date || 'Data de publicação não disponível',
          latestRevision: data.latest_revision || 'N/A',
          revision: data.revision || 'N/A',
          created: data.created.value || 'N/A',
          classifications: data.lc_classifications || [],
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
  }, [bKey]); // O efeito é executado sempre que a bKey muda

  return { bookDetails, isLoading };
}

export function useAuthorDetails(authorKey: string) 
{
  const [authorDetails, setAuthorDetails] = useState<AuthorDetails | null>(null);
  const [isLoadingAuthor, setIsLoadingAuthor] = useState(true);

  useEffect(() => 
  {
    if (!authorKey) return;

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
  }, [authorKey]); // O efeito é executado sempre que a authorKey muda

  return { authorDetails, isLoadingAuthor };
}
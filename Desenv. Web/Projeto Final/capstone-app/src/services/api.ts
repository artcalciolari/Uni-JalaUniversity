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


type Book = {
  key: string;
  title: string;
  authors?: { name: string }[];
  cover_id: number;
};


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
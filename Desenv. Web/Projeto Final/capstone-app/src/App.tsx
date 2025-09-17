import './App.css';
import { useState } from 'react';
import { useBooks } from './services/api';
import BookCard from './components/BookCard';
import Header from './components/Header';

function App() 
{
  const { books, isLoading, hasSearched, searchBooks } = useBooks();
  const [searchTerm, setSearchTerm] = useState<string>();

  return (
    <div className='app-grid'>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchBooks={searchBooks}
        className='header'
      />
      <main className='body'>
        <div className='main-title'>
          {hasSearched ? (
            <h1>Resultados da busca por '{searchTerm}'</h1>
          ) : (
          <>
            <h1>Procurando Por Um Livro?</h1>
            <h2>Nós Podemos Te Ajudar Com Isso!</h2>
            <h3>Esses são alguns dos livros mais famosos de ficção. Dê uma olhada!</h3>
          </>
          )}
        </div>

        <hr />

        <div className='book-list'>
          {isLoading ? (
            <p>Carregando livros...</p>
          ) : (
            books.map((book) => (
              <BookCard
                key={book.key}
                title={book.title}
                author={book.authors && book.authors.length > 0 ? book.authors[0].name : 'Autor Desconhecido'}
                cover_id={book.cover_id}
              />
            ))
          )}
          </div>
      </main>
      <footer className='footer'>
        <p>&copy; 2025 Bookflow. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
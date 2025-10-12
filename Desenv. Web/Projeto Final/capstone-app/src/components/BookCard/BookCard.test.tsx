import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import BookCard from './BookCard';

// Wrapper para fornecer contexto de roteamento
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('BookCard Component', () => 
{
  const mockBook = {
    id: '/works/OL12345W',
    title: 'Dom Quixote',
    author: 'Miguel de Cervantes',
    cover_id: 12345,
  };

  test('deve renderizar título do livro', () => 
  {
    render(
      <TestWrapper>
        <BookCard {...mockBook} />
      </TestWrapper>,
    );

    expect(screen.getByText('Dom Quixote')).toBeInTheDocument();
  });

  test('deve renderizar autor do livro', () => 
  {
    render(
      <TestWrapper>
        <BookCard {...mockBook} />
      </TestWrapper>,
    );

    expect(screen.getByText('Miguel de Cervantes')).toBeInTheDocument();
  });

  test('deve renderizar imagem da capa com URL correta', () => 
  {
    render(
      <TestWrapper>
        <BookCard {...mockBook} />
      </TestWrapper>,
    );

    const coverImage = screen.getByAltText('Capa do livro Dom Quixote');
    expect(coverImage).toBeInTheDocument();
    expect(coverImage).toHaveAttribute('src', 'https://covers.openlibrary.org/b/id/12345-M.jpg');
  });

  test('deve ter link para página de detalhes do livro', () => 
  {
    render(
      <TestWrapper>
        <BookCard {...mockBook} />
      </TestWrapper>,
    );

    const bookLink = screen.getByRole('link');
    expect(bookLink).toHaveAttribute('href', '/book/OL12345W');
  });

  test('deve extrair ID corretamente da chave do livro', () => 
  {
    const bookWithComplexId = {
      id: '/works/OL98765W',
      title: 'Test Book',
      author: 'Test Author',
      cover_id: 98765,
    };

    render(
      <TestWrapper>
        <BookCard {...bookWithComplexId} />
      </TestWrapper>,
    );

    const bookLink = screen.getByRole('link');
    expect(bookLink).toHaveAttribute('href', '/book/OL98765W');
  });

  test('deve ter texto alternativo apropriado para a imagem', () => 
  {
    render(
      <TestWrapper>
        <BookCard {...mockBook} />
      </TestWrapper>,
    );

    const coverImage = screen.getByAltText('Capa do livro Dom Quixote');
    expect(coverImage).toBeInTheDocument();
  });

  test('deve renderizar corretamente com dados diferentes', () => 
  {
    const differentBook = {
      id: '/works/OL11111W',
      title: '1984',
      author: 'George Orwell',
      cover_id: 54321,
    };

    render(
      <TestWrapper>
        <BookCard {...differentBook} />
      </TestWrapper>,
    );

    expect(screen.getByText('1984')).toBeInTheDocument();
    expect(screen.getByText('George Orwell')).toBeInTheDocument();

    const coverImage = screen.getByAltText('Capa do livro 1984');
    expect(coverImage).toHaveAttribute('src', 'https://covers.openlibrary.org/b/id/54321-M.jpg');
  });
});
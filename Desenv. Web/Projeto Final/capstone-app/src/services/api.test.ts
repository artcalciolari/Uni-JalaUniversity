import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { useBooks } from './api';
import type { Mock } from 'vitest';

// Mock do fetch global
global.fetch = vi.fn() as Mock;

describe('useBooks Hook', () => 
{
  beforeEach(() => 
  {
    vi.clearAllMocks();
    // Reset do localStorage se necessário
    vi.restoreAllMocks();
  });

  test('deve inicializar com estado de loading', async() => 
  {
    // Mock do fetch para evitar erro no console
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async() => ({ works: [] }),
    });

    const { result } = renderHook(() => useBooks());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.books).toEqual([]);
    expect(result.current.hasSearched).toBe(false);

    // Aguarda a resolução do estado para evitar warning de act
    await waitFor(() => 
    {
      expect(result.current.isLoading).toBe(false);
    });
  });

  test('deve carregar livros de ficção científica inicialmente', async() => 
  {
    const mockApiResponse = {
      works: [
        {
          key: '/works/OL12345W',
          title: 'Duna',
          authors: [{ name: 'Frank Herbert' }],
          cover_id: 12345,
        },
        {
          key: '/works/OL67890W',
          title: 'Neuromancer',
          authors: [{ name: 'William Gibson' }],
          cover_id: 67890,
        },
      ],
    };

    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async() => mockApiResponse,
    });

    const { result } = renderHook(() => useBooks());

    // Aguarda o carregamento inicial
    await waitFor(() => 
    {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.books).toHaveLength(2);
    expect(result.current.books[0]).toEqual({
      key: '/works/OL12345W',
      title: 'Duna',
      authors: [{ name: 'Frank Herbert' }],
      cover_id: 12345,
    });
    expect(result.current.books[1]).toEqual({
      key: '/works/OL67890W',
      title: 'Neuromancer',
      authors: [{ name: 'William Gibson' }],
      cover_id: 67890,
    });
  });

  test('deve buscar livros por termo', async() => 
  {
    // Mock da resposta inicial (vazia)
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async() => ({ works: [] }),
    });

    const { result } = renderHook(() => useBooks());

    // Aguarda carregamento inicial
    await waitFor(() => 
    {
      expect(result.current.isLoading).toBe(false);
    });

    // Mock da resposta da busca
    const mockSearchResponse = {
      docs: [
        {
          key: '/works/OL11111W',
          title: 'Harry Potter',
          author_name: ['J.K. Rowling'],
          cover_i: 11111,
        },
      ],
    };

    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async() => mockSearchResponse,
    });

    // Executa busca
    await act(async() =>
    {
      await result.current.searchBooks('Harry Potter');
    });

    // Aguarda resultado da busca
    await waitFor(() => 
    {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.hasSearched).toBe(true);
    });

    expect(result.current.books).toHaveLength(1);
    expect(result.current.books[0].title).toBe('Harry Potter');
  });

  test('deve buscar livros por categoria', async() => 
  {
    // Mock da resposta inicial (science_fiction)
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async() => ({ works: [] }),
    });

    const { result } = renderHook(() => useBooks());

    await waitFor(() => 
    {
      expect(result.current.isLoading).toBe(false);
    });

    // Mock da resposta da busca por categoria (dystopian)
    const mockCategoryResponse = {
      works: [
        {
          key: '/works/OL22222W',
          title: 'Fahrenheit 451',
          authors: [{ name: 'Ray Bradbury' }],
          cover_id: 22222,
        },
      ],
    };

    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async() => mockCategoryResponse,
    });

    // Executa busca por categoria
    await act(async() =>
    {
      await result.current.searchBooksByCategory('dystopian');
    });

    await waitFor(() => 
    {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isBrowsingCategory).toBe(true);
    });

    expect(result.current.currentCategory).toBe('dystopian');
    expect(result.current.books).toHaveLength(1);
    expect(result.current.books[0].title).toBe('Fahrenheit 451');
  });

  test('deve lidar com erro de rede', async() => 
  {
    // Silencia o console.error para este teste
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => 
    {
      // Silencia erros esperados
    });

    // Mock de erro de rede
    (global.fetch as Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useBooks());

    // Aguarda que o loading termine (mesmo com erro)
    await waitFor(() => 
    {
      expect(result.current.isLoading).toBe(false);
    });

    // Verifica que o estado permanece consistente
    expect(result.current.books).toEqual([]);
    expect(result.current.hasSearched).toBe(false);

    // Restaura console.error
    consoleErrorSpy.mockRestore();
  });

  test('deve lidar com resposta de erro da API', async() => 
  {
    // Silencia o console.error para este teste
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => 
    {
      // Silencia erros esperados
    });

    // Mock de resposta de erro
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async() => ({ error: 'Internal Server Error' }),
    });

    const { result } = renderHook(() => useBooks());

    await waitFor(() => 
    {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.books).toEqual([]);

    // Restaura console.error
    consoleErrorSpy.mockRestore();
  });

  test('deve normalizar dados corretamente', async() => 
  {
    const mockApiResponse = {
      works: [
        {
          key: '/works/OL33333W',
          title: 'Test Book',
          authors: [{ name: 'Author 1' }, { name: 'Author 2' }],
          cover_id: 33333,
        },
        {
          key: '/works/OL44444W',
          title: 'Book Without Authors',
          authors: [],
          cover_id: 44444,
        },
      ],
    };

    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async() => mockApiResponse,
    });

    const { result } = renderHook(() => useBooks());

    await waitFor(() => 
    {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.books).toHaveLength(2);
    });

    expect(result.current.books[0].authors).toEqual([
      { name: 'Author 1' },
      { name: 'Author 2' },
    ]);
    expect(result.current.books[1].authors).toEqual([]); // Sem autores
  });
});
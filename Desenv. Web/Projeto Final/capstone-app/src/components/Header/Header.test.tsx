import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import Header from './Header';

// Wrapper para fornecer contexto necessário
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      {children}
    </AuthProvider>
  </BrowserRouter>
);

describe('Header Component', () => 
{
  test('deve renderizar logo e título corretamente', () => 
  {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>,
    );

    expect(screen.getByAltText('BookFlow Logo')).toBeInTheDocument();
    expect(screen.getByText('BookFlow')).toBeInTheDocument();
  });

  test('deve exibir botões de login e cadastro', () => 
  {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>,
    );

    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });
});
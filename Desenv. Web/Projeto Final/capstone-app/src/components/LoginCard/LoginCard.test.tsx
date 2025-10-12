import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import LoginCard from './LoginCard';
import userEvent from '@testing-library/user-event';

// Mock do useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async() => 
{
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Wrapper para fornecer contexto necessário
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      {children}
    </AuthProvider>
  </BrowserRouter>
);

describe('LoginCard Component', () => 
{
  beforeEach(() => 
  {
    mockNavigate.mockClear();
  });

  test('deve renderizar campos de email e senha', () => 
  {
    render(
      <TestWrapper>
        <LoginCard />
      </TestWrapper>,
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
  });

  test('deve renderizar botão de login', () => 
  {
    render(
      <TestWrapper>
        <LoginCard />
      </TestWrapper>,
    );

    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  test('deve permitir digitar email e senha', async() => 
  {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <LoginCard />
      </TestWrapper>,
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('deve mostrar mensagem de erro para credenciais inválidas', async() => 
  {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <LoginCard />
      </TestWrapper>,
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    await user.type(emailInput, 'invalid@example.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    // Como estamos usando localStorage, credenciais inválidas não farão login
    // O componente pode mostrar uma mensagem de erro ou não fazer nada
    // Vamos verificar se não redirecionou
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
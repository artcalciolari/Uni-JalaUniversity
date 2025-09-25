/**
 * Ponto de entrada principal da aplicação BookFlow.
 * Configura todos os provedores de contexto necessários e renderiza a aplicação.
 * 
 * @author Arthur Calciolari
 * @category Main
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { LoanProvider } from './contexts/LoanContext.tsx';
import './index.css';
import App from './App.tsx';

/**
 * Inicializa e renderiza a aplicação React com todos os provedores de contexto necessários.
 * 
 * Configura:
 * - StrictMode para detecção de problemas em desenvolvimento
 * - BrowserRouter para roteamento
 * - AuthProvider para autenticação de usuários
 * - LoanProvider para gerenciamento de empréstimos
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LoanProvider>
          <App />
        </LoanProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

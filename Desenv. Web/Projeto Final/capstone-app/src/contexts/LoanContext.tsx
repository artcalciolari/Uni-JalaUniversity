import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

/**
 * Tipo que representa um empréstimo de livro no sistema
 * @category Types
 */
export type Loan = {
  /** Email do usuário que fez o empréstimo */
  userEmail: string,
  /** Chave única do livro (formato: "/works/OL12345W") */
  bookKey: string,
  /** Título do livro emprestado */
  bookTitle: string,
  /** Data de devolução do empréstimo */
  returnDate: Date;
}

/**
 * Interface que define os métodos e propriedades do contexto de empréstimos
 * @category Types
 */
export interface LoanContextType {
  /** Lista de todos os empréstimos ativos */
  loans: Loan[];
  /** Função para adicionar um novo empréstimo */
  addLoan: (bookKey: string, bookTitle: string, userEmail: string) => void;
  /** Função para remover um empréstimo */
  removeLoan: (bookKey: string) => void;
  /** Função para verificar se um livro está emprestado */
  isBookLoaned: (bookKey: string) => boolean;
}

/**
 * Contexto para gerenciar estado global da empréstimo.
 * Centraliza toda a lógica relacionada ao empréstimo de livros.
 * @category Contexts
 */
const LendingContext = createContext<LoanContextType | null>(null);

/**
 * Provedor do contexto de empréstimos.
 * Gerencia o estado dos empréstimos de livros e fornece métodos para adicionar, remover e consultar empréstimos.
 * Os dados são persistidos no localStorage.
 * 
 * @param children - Componentes filhos que terão acesso ao contexto
 * @returns Provedor do contexto de empréstimos
 * 
 * @example
 * ```tsx
 * <LoanProvider>
 *   <App />
 * </LoanProvider>
 * ```
 * 
 * @category Contexts
 */
export function LoanProvider({ children }: { children: ReactNode }) 
{
  const [loans, setLoans] = useState<Loan[]>(() => 
  {
    const storedLoans = localStorage.getItem('loans');
    return storedLoans ? JSON.parse(storedLoans) : [];
  });

  useEffect(() => 
  {
    localStorage.setItem('loans', JSON.stringify(loans));
  }, [loans]);

  const addLoan = (bookKey: string, bookTitle: string, userEmail: string) => 
  {
    const loans = JSON.parse(localStorage.getItem('loans') || '[]') as Loan[];

    if (loans.some(loan => loan.bookKey === bookKey)) 
    {
      return;
    }

    const loanDurationDays = 14; // Duração do empréstimo em dias
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + loanDurationDays);

    const newLoan: Loan = {
      userEmail,
      bookKey,
      bookTitle,
      returnDate,
    };

    setLoans(prevLoans => [...prevLoans, newLoan]);
  };

  const removeLoan = (bookKey: string) => 
  {
    setLoans(prevLoans => prevLoans.filter(loan => loan.bookKey !== bookKey));
  };

  const isBookLoaned = (bookKey: string): boolean => 
  {
    return loans.some(loan => loan.bookKey === bookKey);
  };

  const value = { loans, addLoan, removeLoan, isBookLoaned };

  return <LendingContext.Provider value={value}>{children}</LendingContext.Provider>;
}

/**
 * Hook customizado para acessar o contexto de empréstimos.
 * 
 * @returns Objeto com estado e métodos de empréstimos
 * @throws Erro se usado fora do LoanProvider
 * 
 * @example
 * ```tsx
 * function BookComponent() {
 *   const { addLoan, isBookLoaned } = useLending();
 *   // ...
 * }
 * ```
 * 
 * @category Hooks
 */
export function useLending() 
{
  const context = useContext(LendingContext);
  
  if (!context) 
  {
    throw new Error('useLending deve ser usado dentro de um LendingProvider');
  }

  return context;
}
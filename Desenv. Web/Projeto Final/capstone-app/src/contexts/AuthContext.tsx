import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

/**
 * Tipo que representa um usuário no sistema
 * @category Types
 */
export type User = {
  /** Primeiro nome do usuário */
  firstName: string,
  /** Sobrenome do usuário */
  lastName: string,
  /** Email único do usuário usado para login */
  email: string,
  /** Data de nascimento no formato ISO string */
  birthDate: string,
  /** Senha do usuário (armazenada em plain text para fins educacionais) */
  password: string
}

/**
 * Interface que define os métodos e propriedades do contexto de autenticação
 * @category Types
 */
export interface AuthContextType {
  /** Usuário atualmente logado ou null se não há usuário logado */
  currentUser: User | null;
  /** Função para fazer login do usuário */
  login: (email: string, password: string) => boolean;
  /** Função para fazer logout do usuário */
  logout: () => void;
  /** Função para registrar um novo usuário */
  register: (user: User) => boolean;
}

/**
 * Contexto para gerenciar estado global da autenticação de um usuário.
 * Centraliza toda a lógica relacionada à autenticação.
 * @category Contexts
 */
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Provedor do contexto de autenticação.
 * Gerencia o estado de autenticação dos usuários e fornece métodos para login, logout e registro.
 * Os dados são persistidos no localStorage.
 * 
 * @param children - Componentes filhos que terão acesso ao contexto
 * @returns Provedor do contexto de autenticação
 * 
 * @example
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 * 
 * @category Contexts
 */
export function AuthProvider({ children }: { children: ReactNode }) 
{ 
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const register = (user: User): boolean => 
  {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    const userExists = users.some(u => u.email === user.email);

    if (userExists) 
    {
      return false;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  };
  
  const login = (email: string, password: string): boolean => 
  {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) 
    {
      setCurrentUser(user);
      return true;
    }

    return false;
  };

  const logout = () => 
  {
    setCurrentUser(null);
  };

  const value = { currentUser, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook customizado para acessar o contexto de autenticação.
 * 
 * @returns Objeto com estado e métodos de autenticação
 * @throws Erro se usado fora do AuthProvider
 * 
 * @example
 * ```tsx
 * function LoginComponent() {
 *   const { login, currentUser } = useAuth();
 *   // ...
 * }
 * ```
 * 
 * @category Hooks
 */
export function useAuth() 
{
  const context = useContext(AuthContext);

  if (!context) 
  {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
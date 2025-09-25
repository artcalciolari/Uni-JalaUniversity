import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaCheckCircle, FaTimesCircle, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './LoginCard.module.css';

/**
 * Componente que exibe um formulário de login com validação.
 * Inclui campos para email e senha, validação de entrada e feedback visual.
 * Redireciona para a página inicial após login bem-sucedido.
 * 
 * @returns Elemento JSX do formulário de login
 * 
 * @example
 * ```tsx
 * <LoginCard />
 * ```
 * 
 * @category Components
 */
function LoginCard() 
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null);

  const navigate = useNavigate();

  const { login } = useAuth()!;

  const handleLogin = (e: React.FormEvent) => 
  {
    e.preventDefault();
    const success = login(email, password);

    if (success) 
    {
      setLoginSuccess(true);
      // Limpar campos após login bem-sucedido
      setEmail('');
      setPassword('');

      setTimeout(() => 
      {
        navigate('/');
      }, 1000); // Redireciona após 1 segundo
    }
    else 
    {
      setLoginSuccess(false);
    }
  };

  return (
    <div className={styles.cardContainer}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h2 className={styles.title}>Login</h2>

        {/* Email Input */}      
        <div className={styles.inputContainer}>
          <FaEnvelope className={styles.inputIcon} />
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        {/* Password Input */}
        <div className={styles.inputContainer}>
          <FaLock className={styles.inputIcon} />
          <input
            type='password'
            placeholder='Senha'
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        {/* Login Feedback */}
        {loginSuccess === true ? (
          <div className={styles.successMessage}>
            <FaCheckCircle className={styles.messageIcon} /> 
            <span>Login bem-sucedido! Redirecionando...</span>
          </div>
        ) : loginSuccess === false ? (
          <div className={styles.errorMessage}>
            <FaTimesCircle className={styles.messageIcon} /> 
            <span>Email ou senha incorretos.</span>
          </div>
        ) : null}
        
        <button type='submit' className={styles.loginButton}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginCard;
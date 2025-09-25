import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import type { User } from '../../contexts/AuthContext';
import { FaCheckCircle, FaTimesCircle, FaUser, FaEnvelope, FaLock, FaBirthdayCake } from 'react-icons/fa';

import styles from './RegisterCard.module.css';
import { useNavigate } from 'react-router-dom';

/**
 * Componente que exibe um formulário de registro com validação completa.
 * Inclui campos para informações pessoais, validação de senha e feedback visual.
 * Redireciona para a página de login após registro bem-sucedido.
 * 
 * @returns Elemento JSX do formulário de registro
 * 
 * @example
 * ```tsx
 * <RegisterCard />
 * ```
 * 
 * @category Components
 */
function RegisterCard() 
{
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean | null>(null);

  const navigate = useNavigate();

  const { register } = useAuth()!;

  const handleRegister = (e: React.FormEvent) =>
  {
    e.preventDefault();

    if (password !== confirmPassword)
    {
      setRegistrationSuccess(false);
      return;
    }

    const newUser: User = { firstName, lastName, email, birthDate, password };
    const success = register(newUser);

    if (success) 
    {
      setRegistrationSuccess(true);
      // Limpar campos após registro bem-sucedido
      setFirstName('');
      setLastName('');
      setEmail('');
      setBirthDate('');
      setPassword('');
      setConfirmPassword('');
      
      setTimeout(() => 
      {
        navigate('/login');
      }, 500);
    }
    else 
    {
      setRegistrationSuccess(false);
    }
  };

  return (
    <div className={styles.cardContainer}>
      <form className={styles.registerForm} onSubmit={handleRegister}>
        <h2 className={styles.title}>Register</h2>

        {/* First Name Input */}
        <div className={styles.inputContainer}>
          <FaUser className={styles.inputIcon} />
          <input
            type='text'
            placeholder='Primeiro Nome'
            name='firstName'
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        {/* Last Name Input */}
        <div className={styles.inputContainer}>
          <FaUser className={styles.inputIcon} />
          <input
            type='text'
            placeholder='Sobrenome'
            name='lastName'
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className={styles.input}
            required
          />
        </div>

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

        {/* Birth Date Input */}
        <div className={styles.inputContainer}>
          <FaBirthdayCake className={styles.inputIcon} />
          <input
            type='date'
            placeholder='Data de Nascimento'
            name='birthDate'
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
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

        {/* Confirm Password Input */}
        <div className={styles.inputContainer}>
          <FaLock className={styles.inputIcon} />
          <input
            type='password'
            placeholder='Confirmar Senha'
            name='confirmPassword'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        {/* Registration Feedback */}
        {registrationSuccess === true ? (
          <div className={styles.successMessage}>
            <FaCheckCircle className={styles.icon} />
            <span>Registro bem-sucedido! Redirecionando...</span>
          </div>
        ) : registrationSuccess === false ? (
          <div className={styles.errorMessage}>
            <FaTimesCircle className={styles.icon} />
            <span>Falha no registro. Verifique os dados e tente novamente.</span>
          </div>
        ) : null}
        
        <div className={styles.buttonContainer}>
          <button type='submit' className={styles.button}>Registrar</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterCard;
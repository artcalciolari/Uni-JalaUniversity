import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

/**
 * Propriedades aceitas pelo componente Header
 * @category Types
 */
export type HeaderProps = {
  /** Classes CSS adicionais para personalização */
  className?: string;
}

/**
 * Componente cabeçalho da aplicação BookFlow.
 * Contém logo, título e botões de autenticação.
 * 
 * @param props - Propriedades do Header
 * @returns Elemento JSX do cabeçalho
 * 
 * @example
 * ```tsx
 * <Header className="custom-header" />
 * ```
 * 
 * O Header é um componente fixo que aparece em todas as páginas e inclui:
 * - Logo e título da aplicação com link para home
 * - Botões de login e cadastro (ou perfil/sair se logado)
 * 
 * @category Components
 */
function Header({ className }: HeaderProps) 
{
  const { currentUser, logout } = useAuth()!;
  const navigate = useNavigate();

  return (
    <header className={`${styles.header} ${className || ''}`}>
      {/* Logo Section */}
      <div className={styles.logoSection}>
        <Link to='/'>
          <img
            src='/new_logo.png'
            alt='BookFlow Logo'
          />
        </Link>
        <Link to='/'>
          <span className={styles.logoText}>BookFlow</span>
        </Link>
      </div>

      {/* Actions Section */}
      {currentUser ? (
        <div className={styles.actionsSection}>
          <span className={styles.welcomeMessage}>Bem-vindo, {currentUser!.firstName}!</span>
          <Link to="/profile" className={styles.LoginBtn}>Perfil</Link>
          <button className={styles.SignUpBtn} onClick={() => 
          {
            logout();
            setTimeout(() => 
            {
              navigate('/');
            }, 300);
          }}>Sair</button>
        </div>
      ) : (
        <div className={styles.actionsSection}>
          <Link to={'/login'}>
            <button className={styles.LoginBtn}>Entrar</button>
          </Link>
          <Link to={'/register'}>
            <button className={styles.SignUpBtn}>Cadastrar</button>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
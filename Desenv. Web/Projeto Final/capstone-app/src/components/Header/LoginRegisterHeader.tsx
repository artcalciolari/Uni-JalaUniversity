import styles from './LoginRegisterHeader.module.css';

/**
 * Componente que exibe o cabeçalho simplificado das páginas de login e registro.
 * Contém apenas o logo e nome da aplicação com link para a página inicial.
 * 
 * @returns Elemento JSX do cabeçalho simplificado
 * 
 * @example
 * ```tsx
 * <LoginRegisterHeader />
 * ```
 * 
 * @category Components
 */
function LoginRegisterHeader() 
{
  return <header className={styles.header}>
    <div className={styles.logoSection}>
      <a href='/'>
        <img
          src='/new_logo.png'
          alt='BookFlow Logo'
        />
      </a>
      <a href='/'>
        <span className={styles.logoText}>BookFlow</span>
      </a>
    </div>
  </header>;
}

export default LoginRegisterHeader;
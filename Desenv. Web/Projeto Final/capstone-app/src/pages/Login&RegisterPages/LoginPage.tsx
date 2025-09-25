import styles from './Login&RegisterPages.module.css';
import LoginRegisterHeader from '../../components/Header/LoginRegisterHeader';
import Footer from '../../components/Footer/Footer';
import LoginCard from '../../components/LoginCard/LoginCard';

/**
 * Página de login da aplicação.
 * Exibe o formulário de login dentro de um layout com cabeçalho e rodapé simplificados.
 * 
 * @returns Elemento JSX da página de login
 * 
 * @example
 * ```tsx
 * <Route path="/login" element={<LoginPage />} />
 * ```
 * 
 * @category Pages
 */
export function LoginPage()
{
  return (
    <div className={styles.pageGrid}>
      <LoginRegisterHeader />
      <main className={styles.body}>
        <LoginCard />
      </main>
      <Footer />
    </div>
  );
}
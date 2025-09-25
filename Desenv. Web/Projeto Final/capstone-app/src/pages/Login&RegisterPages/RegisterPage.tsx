import styles from './Login&RegisterPages.module.css';
import LoginRegisterHeader from '../../components/Header/LoginRegisterHeader';
import Footer from '../../components/Footer/Footer';
import RegisterCard from '../../components/RegisterCard/RegisterCard';

/**
 * Página de registro da aplicação.
 * Exibe o formulário de registro dentro de um layout com cabeçalho e rodapé simplificados.
 * 
 * @returns Elemento JSX da página de registro
 * 
 * @example
 * ```tsx
 * <Route path="/register" element={<RegisterPage />} />
 * ```
 * 
 * @category Pages
 */
export function RegisterPage() 
{
  return (
    <div className={styles.pageGrid}>
      <LoginRegisterHeader />
      <main className={styles.body}>
        <RegisterCard />
      </main>
      <Footer />
    </div>
  );
}
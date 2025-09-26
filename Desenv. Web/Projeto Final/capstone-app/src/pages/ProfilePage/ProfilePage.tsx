import { useAuth } from '../../contexts/AuthContext';
import { useLending } from '../../contexts/LoanContext';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import LoanCard from '../../components/LoanCard/LoanCard';
import { Navigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import { FaUser, FaBook, FaCalendarAlt } from 'react-icons/fa';

/**
 * Página de perfil do usuário logado.
 * Exibe informações pessoais e histórico de empréstimos de livros.
 * Requer autenticação - redireciona para login se não estiver logado.
 * 
 * @returns Elemento JSX da página de perfil
 * 
 * @example
 * ```tsx
 * <Route path="/profile" element={<ProfilePage />} />
 * ```
 * 
 * A ProfilePage apresenta:
 * - Header com funcionalidade de busca
 * - Informações pessoais do usuário
 * - Lista de empréstimos ativos
 * - Footer com informações adicionais
 * 
 * @category Pages
 */
export function ProfilePage() 
{
  const { currentUser } = useAuth();
  const { loans } = useLending();

  // Redireciona para login se não estiver autenticado
  if (!currentUser) 
  {
    return <Navigate to="/login" replace />;
  }

  // Filtra empréstimos do usuário atual
  const userLoans = loans.filter(loan => loan.userEmail === currentUser.email);

  // Calcula estatísticas
  const totalLoans = userLoans.length;
  const overdueLoans = userLoans.filter(loan => new Date(loan.returnDate) < new Date()).length;

  return (
    <div className={styles.pageContainer}>
      <Header />  {/* Remover as props searchTerm, setSearchTerm e searchBooks */}
      
      <main className={styles.mainContent}>
        <h1>Meu Perfil</h1>
        
        {/* Seção de informações do usuário */}
        <section className={styles.userInfo}>
          <div className={styles.userCard}>
            <div className={styles.userIcon}>
              <FaUser />
            </div>
            <div className={styles.userDetails}>
              <h2>{currentUser.firstName} {currentUser.lastName}</h2>
              <p className={styles.userEmail}>{currentUser.email}</p>
              <p className={styles.userBirthdate}>
                <FaCalendarAlt /> 
                {new Date(currentUser.birthDate).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          {/* Estatísticas de empréstimos */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <FaBook />
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statNumber}>{totalLoans}</span>
                <span className={styles.statLabel}>Empréstimos Ativos</span>
              </div>
            </div>
            
            <div className={`${styles.statCard} ${overdueLoans > 0 ? styles.statCardWarning : ''}`}>
              <div className={styles.statIcon}>
                <FaCalendarAlt />
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statNumber}>{overdueLoans}</span>
                <span className={styles.statLabel}>Empréstimos em Atraso</span>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de empréstimos */}
        <section className={styles.loansSection}>
          <h2>Meus Empréstimos</h2>
          
          {userLoans.length === 0 ? (
            <div className={styles.emptyState}>
              <FaBook className={styles.emptyIcon} />
              <h3>Nenhum empréstimo ativo</h3>
              <p>Você ainda não fez nenhum empréstimo de livros.</p>
              <p>Explore nossa biblioteca e encontre seus próximos livros favoritos!</p>
            </div>
          ) : (
            <div className={styles.loansGrid}>
              {userLoans.map((loan) => (
                <LoanCard
                  key={loan.bookKey}
                  loan={loan}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ProfilePage;
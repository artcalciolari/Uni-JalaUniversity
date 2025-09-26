import { Link } from 'react-router-dom';
import { useLending } from '../../contexts/LoanContext';
import type { Loan } from '../../contexts/LoanContext';
import styles from './LoanCard.module.css';
import { FaCalendarAlt, FaBook, FaTrash, FaExclamationTriangle } from 'react-icons/fa';

/**
 * Propriedades aceitas pelo componente LoanCard
 * @category Types
 */
export type LoanCardProps = {
  /** Dados do empréstimo a ser exibido */
  loan: Loan;
};

/**
 * Componente que exibe um card com informações de um empréstimo de livro.
 * Inclui título, data de devolução, status e ações disponíveis.
 * 
 * @param props - Propriedades do empréstimo
 * @returns Elemento JSX do card de empréstimo
 * 
 * @example
 * ```tsx
 * <LoanCard 
 *   loan={{
 *     bookKey: "/works/OL12345W",
 *     bookTitle: "Dom Quixote",
 *     userEmail: "user@example.com",
 *     returnDate: new Date("2024-01-15")
 *   }}
 * />
 * ```
 * 
 * O LoanCard apresenta:
 * - Capa do livro (quando disponível)
 * - Título do livro com link para detalhes
 * - Data de devolução com indicador visual de status
 * - Botão para devolver o livro
 * 
 * @category Components
 */
export default function LoanCard({ loan }: LoanCardProps) 
{
  const { removeLoan } = useLending();
  
  // Calcula se o empréstimo está em atraso
  const returnDate = new Date(loan.returnDate);
  const today = new Date();
  const isOverdue = returnDate < today;
  const daysUntilReturn = Math.ceil((returnDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const coverUrl =`https://covers.openlibrary.org/b/id/${loan.coverId}-M.jpg?default=false`;
  console.log('Cover URL:', coverUrl);

  const handleReturnBook = (e: React.MouseEvent) => 
  {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm(`Deseja devolver o livro "${loan.bookTitle}"?`)) 
    {
      removeLoan(loan.bookKey);
    }
  };

  const getStatusInfo = () => 
  {
    if (isOverdue) 
    {
      return {
        className: styles.overdue,
        icon: <FaExclamationTriangle />,
        text: `${Math.abs(daysUntilReturn)} dias em atraso`,
        color: 'var(--error-500)',
      };
    } 
    else if (daysUntilReturn <= 3) 
    {
      return {
        className: styles.warning,
        icon: <FaCalendarAlt />,
        text: daysUntilReturn === 0 ? 'Vence hoje' : `${daysUntilReturn} dias restantes`,
        color: 'var(--warning-500)',
      };
    } 
    else 
    {
      return {
        className: styles.normal,
        icon: <FaCalendarAlt />,
        text: `${daysUntilReturn} dias restantes`,
        color: 'var(--success-500)',
      };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className={`${styles.loanCard} ${statusInfo.className}`}>
      <Link to={`/book${loan.bookKey}`} className={styles.cardLink}>
        {/* Capa do livro */}
        <div className={styles.bookCover}>
          <img
            src={coverUrl}
            alt={`Capa do livro ${loan.bookTitle}`}
            onError={(e) => 
            {
              const target = e.target as HTMLImageElement;
              target.src = '/book-placeholder.svg';
            }}
          />
          <div className={styles.bookIcon}>
            <FaBook />
          </div>
        </div>

        {/* Informações do empréstimo */}
        <div className={styles.loanInfo}>
          <h3 className={styles.bookTitle}>{loan.bookTitle}</h3>
          
          <div className={styles.loanDetails}>
            <div className={styles.returnDate}>
              {statusInfo.icon}
              <span style={{ color: statusInfo.color }}>
                {statusInfo.text}
              </span>
            </div>
            
            <div className={styles.dueDate}>
              <strong>Devolução:</strong> {returnDate.toLocaleDateString('pt-BR')}
            </div>
          </div>
        </div>
      </Link>

      {/* Botão de devolução */}
      <button
        className={styles.returnButton}
        onClick={handleReturnBook}
        title="Devolver livro"
        aria-label={`Devolver o livro ${loan.bookTitle}`}
      >
        <FaTrash />
        <span>Devolver</span>
      </button>
    </div>
  );
}
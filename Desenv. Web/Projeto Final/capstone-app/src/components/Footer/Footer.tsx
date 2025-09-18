import styles from './Footer.module.css';
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

type FooterProps = {
  className?: string;
}

function Footer({ className }: FooterProps) 
{
  return (
    <footer className={`${styles.footer} ${className || ''}`}>
      <div className={styles.footerContent}>
        <div className={styles.brandSection}>
          <h2 className={styles.brandName}>BookFlow</h2>
          <p className={styles.brandDescription}>
            Sua biblioteca digital moderna. Descubra, explore e mergulhe no mundo dos livros 
            com a melhor experiência de leitura.
          </p>
          <div className={styles.socialLinks}>
            <a
              className={styles.socialLink}
              href="https://github.com/artcalciolari/Uni-JalaUniversity/tree/main/Desenv.%20Web/Projeto%20Final/capstone-app"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <button className={styles.socialLink} aria-label="Twitter">
              <FaTwitter />
            </button>
            <button className={styles.socialLink} aria-label="Instagram">
              <FaInstagram />
            </button>
            <button className={styles.socialLink} aria-label="LinkedIn">
              <FaLinkedin />
            </button>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Explorar</h3>
          <div className={styles.footerLinks}>
            <button className={styles.footerLink}>Livros em Destaque</button>
            <button className={styles.footerLink}>Categorias</button>
            <button className={styles.footerLink}>Autores</button>
            <button className={styles.footerLink}>Lançamentos</button>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Conta</h3>
          <div className={styles.footerLinks}>
            <button className={styles.footerLink}>Minha Biblioteca</button>
            <button className={styles.footerLink}>Lista de Desejos</button>
            <button className={styles.footerLink}>Histórico</button>
            <button className={styles.footerLink}>Configurações</button>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Suporte</h3>
          <div className={styles.footerLinks}>
            <button className={styles.footerLink}>Central de Ajuda</button>
            <button className={styles.footerLink}>Contato</button>
            <button className={styles.footerLink}>FAQ</button>
            <button className={styles.footerLink}>Feedback</button>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          &copy; 2025 BookFlow. Todos os direitos reservados.
        </p>
        <div className={styles.legalLinks}>
          <button className={styles.legalLink}>Termos de Uso</button>
          <button className={styles.legalLink}>Política de Privacidade</button>
          <button className={styles.legalLink}>Cookies</button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './NotFound.css';

const NotFound = () => 
{
  const { isDarkMode } = useTheme();

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-icon">
          <span className="error-code">404</span>
          <span className="weather-emoji">🌪️</span>
        </div>
        
        <h1>Página Não Encontrada</h1>
        <p>
          Parece que você se perdeu na tempestade! 
          A página que você está procurando não existe.
        </p>
        
        <div className="not-found-actions">
          <Link to="/" className="home-button">
            🏠 Voltar ao Início
          </Link>
          <Link to="/about" className="about-button">
            ℹ️ Sobre a Aplicação
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
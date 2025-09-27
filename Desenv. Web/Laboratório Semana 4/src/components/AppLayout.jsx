import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';
import './AppLayout.css';

const AppLayout = () => 
{
  const { isDarkMode } = useTheme();
  const location = useLocation();

  return (
    <div className={`app ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="container">
        <header className="app-header">
          <div className="header-content">
            <h1>🌤️ Painel Meteorológico</h1>
            <nav className="main-nav">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Início
              </Link>
              <Link 
                to="/about" 
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              >
                Sobre
              </Link>
            </nav>
            <ThemeSwitcher />
          </div>
        </header>

        <main className="app-main">
          <Outlet />
        </main>

        <footer className="app-footer">
          <p>Dados fornecidos por Open-Meteo</p>
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;